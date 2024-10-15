import { useNavigation } from '@react-navigation/native';

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

/* Errors */
import { RequestError } from '@domain/errors';

/* Services */
import { LessonsService } from '../services';

/* Hooks */
import { coursesMessages, CoursesService } from '@courses';
import { useNetwork, useStatus } from '@shared';

/* Interfaces */
import { LessonFormValues } from '../interfaces';
import { LoadResourcesOptions } from '@ui';

/* Utils */
import { authMessages } from '@auth';
import { lessonsMessages } from '../utils';

/**
 * Hook to management lessons of store with state and actions
 */
const useLessons = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { wifi } = useNetwork();

    const state = useAppSelector(store => store.lessons);
    const { user, isAuthenticated } = useAppSelector(store => store.auth);
    const { selectedCourse } = useAppSelector(store => store.courses);

    const { setUnauthenticatedError, setNetworkError, setStatus, setTranslatedError } = useStatus();

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
     * It deletes a lesson from the database and updates the state of the app.
     *
     * @param {boolean} back - This parameter allows you to return to the previous screen, by default it is `false`
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deleteLesson = async (back: boolean = false, onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFinish && onFinish());
            return;
        }

        /* Should not delete if selectedLesson.id is an empty string */
        if (state.selectedLesson.id === '') {
            onFinish && onFinish();
            setStatus({ code: 400, msg: lessonsMessages.UNSELECTED_DELETE });

            return;
        }

        /* Cannot delete a class if the selectedCourse.user_id is different from user.id */
        if (selectedCourse.userId !== user.id) {
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.UNAUTHORIZED });

            return;
        }

        setIsLessonDeleting(true);

        const result = await LessonsService.delete(state.selectedLesson.id);

        if (result instanceof RequestError) {
            setIsLessonDeleting(false);
            onFinish && onFinish();
            setTranslatedError(result.status, result.message);

            return;
        }

        if (user.precursor === 'ninguno' && state.selectedLesson.id === state.lastLesson.id) {
            await loadLastLesson();
        }

        removeLesson(state.selectedLesson.id);
        replaceLastLessonInCourse(state.selectedLesson.id, state.lessons[0]);
        onFinish && onFinish();
        back && navigation.goBack();

        setSelectedLesson({
            ...INIT_LESSON,
            nextLesson: new Date().toString()
        });

        setStatus({ code: 200, msg: lessonsMessages.DELETED_SUCCESS });
    }

    /**
     * This function is to finish or start a lesson again.
     *
     * @param {Date} nextLesson - This is date of next lesson
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const finishOrStartLesson = async (nextLesson: Date, onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFinish && onFinish());
            return;
        }

        /* Should not update if selectedLesson.id is an empty string */
        if (state.selectedLesson.id === '') {
            onFinish && onFinish();
            setStatus({ code: 400, msg: lessonsMessages.UNSELECTED });

            return;
        }

        /* If the selectedCourse is suspended or finished it should not be updated */
        if (selectedCourse.suspended || selectedCourse.finished) {
            onFinish && onFinish();
            setStatus({ code: 400, msg: lessonsMessages.SUSPENDED_OR_FINISHED });

            return;
        }

        setIsLessonLoading(true);

        const finishOrStartDto = FinishOrStartLessonDto.create({ done: !state.selectedLesson.done, nextLesson });
        const result = await LessonsService.finishOrStart(state.selectedLesson.id, selectedCourse.id, finishOrStartDto);

        if (result instanceof RequestError) {
            setIsLessonLoading(false);
            onFinish && onFinish();
            setTranslatedError(result.status, result.message);

            return;
        }

        updateLessonActionState(result);
        updateLastLessonInCourse(result);
        if (user.precursor !== 'ninguno') await loadLastLesson();

        onFinish && onFinish();
        setIsLessonLoading(false);

        const msg = (result.done) ? lessonsMessages.FINISHED_SUCCESS : lessonsMessages.RESTARTED_SUCCESS;
        setStatus({ code: 200, msg });
    }

    /**
     * Loads the last lesson asynchronously.
     *
     * @return {Promise<void>} Promise that resolves when the last lesson is loaded.
     */
    const loadLastLesson = async (): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        setIsLastLessonLoading(true);

        if (!isAuthenticated) {
            setUnauthenticatedError(() => setIsLastLessonLoading(false));
            return;
        }

        const resultCourses = await CoursesService.getCourseIdsByUserId(selectedCourse.userId);

        if (resultCourses instanceof RequestError) {
            setIsLastLessonLoading(false);
            setTranslatedError(resultCourses.status, resultCourses.message);
            return;
        }

        const result = await LessonsService.getLastLessonByCoursesId(resultCourses);

        if (result instanceof RequestError) {
            setIsLastLessonLoading(false);
            setTranslatedError(result.status, result.message);
            return;
        }

        addLastLesson(result);
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
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

         /* Should not update if selectedCourse .id is an empty string */
        if (selectedCourse.id === '') {
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED });
            return;
        }

        setIsLessonsLoading(true);

        const result = await LessonsService.getAllByCourseId(selectedCourse.id, {
            search,
            pagination: {
                from: (refresh) ? 0 : state.lessonsPagination.from,
                to: (refresh) ? 9 : state.lessonsPagination.to
            }
        });

        if (result instanceof RequestError) {
            setIsLessonsLoading(false);
            setTranslatedError(result.status, result.message);
            return;
        }

        if (result.length >= 10) {
            setLessonsPagination({
                from: (refresh) ? 10 : state.lessonsPagination.from + 10,
                to: (refresh) ? 19 : state.lessonsPagination.to + 10
            });
        }

        setHasMoreLessons(result.length >= 10);
        (loadMore) ? addLessons(result) : setLessons(result);
    }

    /**
     * This function saves a lesson to the database and then navigates to the LessonsScreen.
     *
     * @param {LessonFormValues} lessonValues - This is a values for save lesson
     * @return {Promise<void>} This function does not return anything.
     */
    const saveLesson = async (lessonValues: LessonFormValues): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        setIsLessonLoading(true);

        const createDto = CreateLessonDto.create({ ...lessonValues, courseId: selectedCourse.id });
        const result = await LessonsService.create(createDto);

        if (result instanceof RequestError) {
            setIsLessonLoading(false);
            setTranslatedError(result.status, result.message);
            return;
        }

        addLastLessonInCourse(selectedCourse.id, result);

        if (state.lessons.length > 0) addLesson(result);
        else setIsLessonLoading(false);

        if (user.precursor === 'ninguno') await loadLastLesson();

        setStatus({ code: 201, msg: lessonsMessages.ADDED_SUCCESS });
        navigation.navigate('LessonsScreen' as never);
    }

    /**
     * It updates a lesson in the database and then updates the state with the updated lesson.
     *
     * @param {LessonFormValues} lessonValues - This is a values for update lesson
     * @return {Promise<void>} This function does not return anything.
     */
    const updateLesson = async (lessonValues: LessonFormValues): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        if (state.selectedLesson.id === '') {
            setStatus({ code: 400, msg: lessonsMessages.UNSELECTED_UPDATE });
            return;
        }

        setIsLessonLoading(true);

        const updateDto = UpdateLessonDto.create(lessonValues);
        const result = await LessonsService.update(state.selectedLesson.id, selectedCourse.id, updateDto);

        if (result instanceof RequestError) {
            setIsLessonLoading(false);
            setTranslatedError(result.status, result.message);
            return;
        }

        updateLastLessonInCourse(result);
        updateLessonActionState(result);

        setIsLessonLoading(false);
        setStatus({ code: 200, msg: lessonsMessages.UPDATED_SUCCESS });

        navigation.goBack();
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