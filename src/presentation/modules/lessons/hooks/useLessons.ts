import { useNavigation } from '@react-navigation/native';

/* Constants */
import { authMessages, coursesMessages, lessonsMessages, precursors } from '@application/constants';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    addLastLesson as addLastLessonAction,
    addLastLessonInCourse as addLastLessonInCourseAction,
    addLesson as addLessonAction,
    addLessons as addLessonsAction,
    clearLessons as clearLessonsAction,
    INIT_LESSON,
    removeLesson as removeLessonAction,
    removeLessons as removeLessonsAction,
    replaceLastLessonInCourse as replaceLastLessonInCourseAction,
    setHasMoreLessons as setHasMoreLessonsAction,
    setIsLastLessonLoading as setIsLastLessonLoadingAction,
    setIsLessonDeleting as setIsLessonDeletingAction,
    setIsLessonLoading as setIsLessonLoadingAction,
    setIsLessonsLoading as setIsLessonsLoadingAction,
    setLessons as setLessonsAction,
    setLessonsPagination as setLessonsPaginationAction,
    setSelectedLesson as setSelectedLessonAction,
    updateLastLessonInCourse as updateLastLessonInCourseAction,
    Pagination,
    updateLesson as updateLessonAction,
} from '@application/features';

/* DTOs */
import { CreateLessonDto, FinishOrStartLessonDto, UpdateLessonDto } from '@domain/dtos';

/* Entities */
import { LessonEntity, LessonWithCourseEntity } from '@domain/entities';

/* Services */
import { CoursesService, LessonsService } from '@domain/services';

/* Hooks */
import { useAuth } from '@auth';
import { useNetwork, useStatus } from '@shared';

/* Interfaces */
import { LessonFormValues } from '../interfaces';
import { LoadResourcesOptions } from '@ui';

/**
 * Hook to management lessons of store with state and actions
 */
const useLessons = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { hasWifiConnection } = useNetwork();

    const state = useAppSelector(store => store.lessons);
    const { user } = useAppSelector(store => store.auth);
    const { selectedCourse } = useAppSelector(store => store.courses);

    const { isAuthenticated } = useAuth();
    const { setError, setStatus } = useStatus();

    const addLastLesson = (lesson: LessonWithCourseEntity) => dispatch(addLastLessonAction({ lesson }));
    const addLastLessonInCourse = (courseId: string, lastLesson: LessonEntity) => dispatch(addLastLessonInCourseAction({ courseId, lastLesson }));
    const addLesson = (lesson: LessonEntity) => dispatch(addLessonAction({ lesson }));
    const addLessons = (lessons: LessonEntity[]) => dispatch(addLessonsAction({ lessons }));
    const clearLessons = () => dispatch(clearLessonsAction());
    const removeLesson = (id: string) => dispatch(removeLessonAction({ id }));
    const removeLessons = () => dispatch(removeLessonsAction());
    const replaceLastLessonInCourse = (lessonId: string, lastLesson: LessonEntity) => dispatch(replaceLastLessonInCourseAction({ lastLesson, lessonId }));
    const setHasMoreLessons = (hasMore: boolean) => dispatch(setHasMoreLessonsAction({ hasMore }));
    const setIsLastLessonLoading = (isLoading: boolean) => dispatch(setIsLastLessonLoadingAction({ isLoading }));
    const setIsLessonDeleting = (isDeleting: boolean) => dispatch(setIsLessonDeletingAction({ isDeleting }));
    const setIsLessonLoading = (isLoading: boolean) => dispatch(setIsLessonLoadingAction({ isLoading }));
    const setIsLessonsLoading = (isLoading: boolean) => dispatch(setIsLessonsLoadingAction({ isLoading }));
    const setLessons = (lessons: LessonEntity[]) => dispatch(setLessonsAction({ lessons }));
    const setLessonsPagination = (pagination: Pagination) => dispatch(setLessonsPaginationAction({ pagination }));
    const setSelectedLesson = (lesson: LessonEntity) => dispatch(setSelectedLessonAction({ lesson }));
    const updateLastLessonInCourse = (lesson: LessonEntity) => dispatch(updateLastLessonInCourseAction({ lesson }));
    const updateLessonActionState = (lesson: LessonEntity) => dispatch(updateLessonAction({ lesson }));

    /**
     * Resets the selected lesson to the initial state with the `nextLesson` date set to the current date.
     *
     * @return {void} This function does not return anything.
     */
    const resetSelectedLesson = (): void => {
        setSelectedLesson({
            ...INIT_LESSON,
            nextLesson: new Date().toString()
        });
    }

    /**
     * Checks if the user can alterate a lesson. If the lesson is not selected or
     * the user is not authorized to alterate the lesson, it sets the status with
     * a corresponding error message and returns false.
     *
     * @param {string} unSelectedMsg - The error message to display if the lesson
     * is not selected
     * @param {Function} onError - A callback to execute if an error occurs
     * @return {boolean} True if the user can alterate the lesson, false otherwise
     */
    const canAlterateLesson = (unSelectedMsg: string, onError?: () => void): boolean => {
        if (state.selectedLesson.id === '') {
            onError && onError();
            setStatus({ code: 400, msg: unSelectedMsg });

            return false;
        }

        if (selectedCourse.userId !== user.id) {
            onError && onError();
            setStatus({ code: 401, msg: authMessages.UNAUTHORIZED });

            return false;
        }

        return true;
    }

    /**
     * Checks if the selected course is either suspended or finished. If so, it sets the status
     * with a corresponding error message and executes the optional error callback.
     *
     * @param {Function} onError - A callback to execute if the course is suspended or finished.
     * @return {boolean} Returns true if the course is suspended or finished, false otherwise.
     */
    const isSelectedCourseSuspendedOrFinished = (onError?: () => void): boolean => {
        if (selectedCourse.suspended || selectedCourse.finished) {
            onError && onError();
            setStatus({ code: 400, msg: lessonsMessages.SUSPENDED_OR_FINISHED });

            return true;
        }

        return false;
    }

    /**
     * Checks if the selected course is empty. If the selected course ID is an empty string,
     * it sets the status with an error message and executes the optional error callback.
     *
     * @param {Function} onError - A callback to execute if the course is empty.
     * @return {boolean} Returns true if the selected course is empty, false otherwise.
     */
    const isSelectedCourseEmpty = (onError?: () => void): boolean => {
        if (selectedCourse.id === '') {
            onError && onError();
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED });

            return true;
        }

        return false;
    }

    /**
     * It deletes a lesson from the database and updates the state of the app.
     *
     * @param {boolean} back - This parameter allows you to return to the previous screen, by default it is `false`
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deleteLesson = async (back: boolean = false, onFinish?: () => void): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        const canAlterate = canAlterateLesson(lessonsMessages.UNSELECTED_DELETE, onFinish);
        if (!canAlterate) return;

        setIsLessonDeleting(true);

        try {
            await LessonsService.delete(state.selectedLesson.id);
            removeLesson(state.selectedLesson.id);

            if (user.precursor === precursors.NINGUNO && state.selectedLesson.id === state.lastLesson.id) {
                await loadLastLesson();
            }

            replaceLastLessonInCourse(state.selectedLesson.id, state.lessons[0]);
            onFinish && onFinish();
            setStatus({ code: 200, msg: lessonsMessages.DELETED_SUCCESS });

            resetSelectedLesson();
            back && navigation.goBack();

        }
        catch (error) {
            setIsLessonDeleting(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * This function is to finish or start a lesson again.
     *
     * @param {Date} nextLesson - This is date of next lesson
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const finishOrStartLesson = async (nextLesson: Date, onFinish?: () => void): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        const canAlterate = canAlterateLesson(lessonsMessages.UNSELECTED, onFinish);
        if (!canAlterate) return;

        const courseSelectedSuspendedOrFinished = isSelectedCourseSuspendedOrFinished(onFinish);
        if (courseSelectedSuspendedOrFinished) return;

        setIsLessonLoading(true);

        try {
            const finishOrStartDto = FinishOrStartLessonDto.create({ done: !state.selectedLesson.done, nextLesson });
            const lesson = await LessonsService.finishOrStart(state.selectedLesson.id, selectedCourse.id, finishOrStartDto);

            updateLessonActionState(lesson);
            updateLastLessonInCourse(lesson);
            if (user.precursor === precursors.NINGUNO) await loadLastLesson();

            onFinish && onFinish();
            const msg = (lesson.done) ? lessonsMessages.FINISHED_SUCCESS : lessonsMessages.RESTARTED_SUCCESS;
            setStatus({ code: 200, msg });
        }
        catch (error) {
            setIsLessonLoading(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * Loads the last lesson asynchronously.
     *
     * @return {Promise<void>} Promise that resolves when the last lesson is loaded.
     */
    const loadLastLesson = async (): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        try {
            const courseIds = await CoursesService.getCourseIdsByUserId(user.id);
            const lastLesson = await LessonsService.getLastLessonByCoursesId(courseIds);

            addLastLesson(lastLesson);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsLastLessonLoading(false);
        }
    }

    /**
     * This function is to load the lessons using the options that are passed by parameter, you can
     * load them for pagination or not.
     *
     * @param {LoadResourcesOptions} { loadMore: boolean, refresh: boolean, search: string } - They are the options that are used to load the lessons:
     * - loadMore: This flag is used to add or set the lessons that are requested, default is `false`
     * - refresh: This flag is to reset the pagination of the lessons, default is `false`
     * - search: This is a search text to search lessons, default is empty `string`
     * @return {Promise<void>} This function does not return anything.
     */
    const loadLessons = async ({ loadMore = false, refresh = false, search = '' }: LoadResourcesOptions): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        const isCourseEmpty = isSelectedCourseEmpty();
        if (isCourseEmpty) return;

        setIsLessonsLoading(true);

        try {
            const lessons = await LessonsService.paginateByCourseId(selectedCourse.id, {
                search,
                pagination: {
                    from: (refresh) ? 0 : state.lessonsPagination.from,
                    to: (refresh) ? 9 : state.lessonsPagination.to
                }
            });

            if (lessons.length >= 10) {
                setLessonsPagination({
                    from: (refresh) ? 10 : state.lessonsPagination.from + 10,
                    to: (refresh) ? 19 : state.lessonsPagination.to + 10
                });
            }

            setHasMoreLessons(lessons.length >= 10);
            (loadMore) ? addLessons(lessons) : setLessons(lessons);
        }
        catch (error) {
            setIsLessonsLoading(false);
            setError(error);
        }
    }

    /**
     * This function saves a lesson to the database and then navigates to the LessonsScreen.
     *
     * @param {LessonFormValues} lessonValues - This is a values for save lesson
     * @return {Promise<void>} This function does not return anything.
     */
    const saveLesson = async (lessonValues: LessonFormValues): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsLessonLoading(true);

        try {
            const createDto = CreateLessonDto.create({ ...lessonValues, courseId: selectedCourse.id });
            const lesson = await LessonsService.create(createDto);

            addLastLessonInCourse(selectedCourse.id, lesson);

            if (state.lessons.length > 0) addLesson(lesson);
            else setIsLessonLoading(false);

            if (user.precursor === precursors.NINGUNO) await loadLastLesson();

            setStatus({ code: 201, msg: lessonsMessages.ADDED_SUCCESS });
            navigation.navigate('LessonsScreen' as never);
        }
        catch (error) {
            setIsLessonLoading(false);
            setError(error);
        }
    }

    /**
     * It updates a lesson in the database and then updates the state with the updated lesson.
     *
     * @param {LessonFormValues} lessonValues - This is a values for update lesson
     * @return {Promise<void>} This function does not return anything.
     */
    const updateLesson = async (lessonValues: LessonFormValues): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        const canAlterate = canAlterateLesson(lessonsMessages.UNSELECTED_UPDATE);
        if (!canAlterate) return;

        setIsLessonLoading(true);

        try {
            const updateDto = UpdateLessonDto.create(lessonValues);
            const lesson = await LessonsService.update(state.selectedLesson.id, selectedCourse.id, updateDto);

            updateLessonActionState(lesson);
            updateLastLessonInCourse(lesson);

            setStatus({ code: 200, msg: lessonsMessages.UPDATED_SUCCESS });
            navigation.goBack();
        }
        catch (error) {
            setIsLessonLoading(false);
            setError(error);
        }
    }

    return {
        state,

        // Actions
        clearLessons,
        removeLessons,
        setLessonsPagination,
        setSelectedLesson,

        // Functions
        deleteLesson,
        finishOrStartLesson,
        loadLastLesson,
        loadLessons,
        saveLesson,
        updateLesson,
    }
}

export default useLessons;