/* Config */
import { coursesService, lessonsService, messagesService } from '@config/di';

/* Constants */
import { precursors } from '@application/constants/utils';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    addLesson as addLessonAction,
    addLessons as addLessonsAction,
    clearLessons as clearLessonsAction,
    INIT_LESSON,
    removeLesson as removeLessonAction,
    removeLessons as removeLessonsAction,
    setHasMoreLessons as setHasMoreLessonsAction,
    setIsLastLessonLoading as setIsLastLessonLoadingAction,
    setIsLessonDeleting as setIsLessonDeletingAction,
    setIsLessonLoading as setIsLessonLoadingAction,
    setIsLessonsLoading as setIsLessonsLoadingAction,
    setLastLesson as setLastLessonAction,
    setLessons as setLessonsAction,
    setLessonsPagination as setLessonsPaginationAction,
    setSelectedLesson as setSelectedLessonAction,
    updateLesson as updateLessonAction,
} from '@application/features/lessons';

import {
    addLastLessonInCourse as addLastLessonInCourseAction,
    replaceLastLessonInCourse as replaceLastLessonInCourseAction,    
    updateLastLessonInCourse as updateLastLessonInCourseAction
} from '@application/features/courses';

/* DTOs */
import { CreateLessonDto, FinishOrStartLessonDto, UpdateLessonDto } from '@domain/dtos';

/* Entities */
import { LessonEntity, LessonWithCourseEntity } from '@domain/entities';

/* Hooks */
import { useAuth } from '@auth/hooks';
import { useNetwork } from '@shared/hooks';
import { useToaster } from '@ui/hooks';

/* Interfaces */
import { LessonFormValues } from '../interfaces';
import { UtilFunctions } from '@shared/interfaces';
import { LoadResourcesOptions, Pagination } from '@ui/interfaces';

/**
 * Hook to management lessons of store with state and actions
 */
const useLessons = () => {
    const authMessages = messagesService.authMessages;
    const coursesMessages = messagesService.coursesMessages;
    const lessonsMessages = messagesService.lessonsMessages;

    const dispatch = useAppDispatch();
    const { hasWifiConnection } = useNetwork();

    const state = useAppSelector(store => store.lessons);
    const { user } = useAppSelector(store => store.auth);
    const { selectedCourse } = useAppSelector(store => store.courses);

    const { isAuthenticated } = useAuth();
    const { showError, showToast } = useToaster();

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
    const setLastLesson = (lesson: LessonWithCourseEntity) => dispatch(setLastLessonAction({ lesson }));
    const setLessons = (lessons: LessonEntity[]) => dispatch(setLessonsAction({ lessons }));
    const setLessonsPagination = (pagination: Pagination) => dispatch(setLessonsPaginationAction({ pagination }));
    const setSelectedLesson = (lesson: LessonEntity) => dispatch(setSelectedLessonAction({ lesson }));
    const updateLastLessonInCourse = (lesson: LessonEntity) => dispatch(updateLastLessonInCourseAction({ lesson }));
    const updateLessonActionState = (lesson: LessonEntity) => dispatch(updateLessonAction({ lesson }));

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
            showToast(unSelectedMsg);

            return false;
        }

        if (selectedCourse.userId !== user.id) {
            onError && onError();
            showToast(authMessages.UNAUTHORIZED);

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
            showToast(lessonsMessages.SUSPENDED_OR_FINISHED);

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
            showToast(coursesMessages.UNSELECTED);

            return true;
        }

        return false;
    }

    /**
     * Clears the selected lesson to the initial state with the `nextLesson` date set to the current date.
     *
     * @return {void} This function does not return anything.
     */
    const clearSelectedLesson = (): void => {
        setSelectedLesson({
            ...INIT_LESSON,
            nextLesson: new Date().toString()
        });
    }

    /**
     * Deletes the selected lesson and updates the state accordingly.
     *
     * @param {Object} options - Options for the delete operation.
     * @param {Function} options.onFinish - Callback executed when the process is finished (success or failure).
     * @param {Function} options.onSuccess - Callback executed on successful deletion.
     * @return {Promise<void>} This function does not return anything.
     */
    const deleteLesson = async ({ onFinish, onSuccess }: UtilFunctions): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        const canAlterate = canAlterateLesson(lessonsMessages.UNSELECTED_DELETE, onFinish);
        if (!canAlterate) return;

        setIsLessonDeleting(true);

        try {
            await lessonsService.delete(state.selectedLesson.id);

            if (user.precursor === precursors.NINGUNO && state.selectedLesson.id === state.lastLesson.id) {
                await loadLastLesson();
            }

            onFinish && onFinish();
            removeLesson(state.selectedLesson.id);
            setIsLessonDeleting(false);
            replaceLastLessonInCourse(state.selectedLesson.id, state.lessons[0]);
            onSuccess && onSuccess();

            clearSelectedLesson();
            showToast(lessonsMessages.DELETED_SUCCESS);
        }
        catch (error) {
            setIsLessonDeleting(false);
            onFinish && onFinish();

            showError(error);
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
            const lesson = await lessonsService.finishOrStart(state.selectedLesson.id, selectedCourse.id, finishOrStartDto);

            updateLessonActionState(lesson);
            updateLastLessonInCourse(lesson);
            if (user.precursor === precursors.NINGUNO) await loadLastLesson();

            onFinish && onFinish();
            const msg = (lesson.done) ? lessonsMessages.FINISHED_SUCCESS : lessonsMessages.REPROGRAMMED_SUCCESS;
            showToast(msg);
        }
        catch (error) {
            setIsLessonLoading(false);
            onFinish && onFinish();

            showError(error);
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

        setIsLastLessonLoading(true);

        try {
            const courseIds = await coursesService.getCourseIdsByUserId(user.id);
            const lastLesson = await lessonsService.getLastLessonByCoursesId(courseIds);

            setLastLesson(lastLesson);
        }
        catch (error) {
            showError(error);
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
            const lessons = await lessonsService.paginateByCourseId(selectedCourse.id, {
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

            if (loadMore) addLessons(lessons);
            else setLessons(lessons);
        }
        catch (error) {
            showError(error);
        }
        finally {
            setIsLessonsLoading(false);
        }
    }

    /**
     * This function saves a lesson to the database and then navigates to the LessonsScreen.
     *
     * @param {LessonFormValues} values - This is a values for save lesson
     * @param {UtilFunctions} utils - This is a utils for save lesson
     * @return {Promise<void>} This function does not return anything.
     */
    const saveLesson = async (values: LessonFormValues, utils?: UtilFunctions): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsLessonLoading(true);

        try {
            const createDto = CreateLessonDto.create({ ...values, courseId: selectedCourse.id });
            const lesson = await lessonsService.create(createDto);

            addLastLessonInCourse(selectedCourse.id, lesson);
            if (user.precursor === precursors.NINGUNO) await loadLastLesson();

            if (state.lessons.length > 0) addLesson(lesson);
            setIsLessonLoading(false);

            showToast(lessonsMessages.ADDED_SUCCESS);
            utils?.onSuccess?.() 
        }
        catch (error) {
            setIsLessonLoading(false);
            showError(error);
        }
        finally {
            utils?.onFinish?.()
        }
    }

    /**
     * It updates a lesson in the database and then updates the state with the updated lesson.
     *
     * @param {LessonFormValues} values - This is a values for update lesson
     * @param {UtilFunctions} utils
     * @return {Promise<void>} This function does not return anything.
     */
    const updateLesson = async (values: LessonFormValues, utils?: UtilFunctions): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        const canAlterate = canAlterateLesson(lessonsMessages.UNSELECTED_UPDATE);
        if (!canAlterate) return;

        setIsLessonLoading(true);

        try {
            const updateDto = UpdateLessonDto.create(values);
            const lesson = await lessonsService.update(state.selectedLesson.id, selectedCourse.id, updateDto);

            updateLessonActionState(lesson);
            if (lesson.id === state.selectedLesson.id) setSelectedLesson(lesson);
            if (lesson.id === state.lastLesson.id) setLastLesson({ ...lesson, course: state.lastLesson.course });

            updateLastLessonInCourse(lesson);
            setIsLessonLoading(false);

            showToast(lessonsMessages.UPDATED_SUCCESS);
            utils?.onSuccess?.();
        }
        catch (error) {
            setIsLessonLoading(false);
            showError(error);
        }
        finally {
            utils?.onFinish?.()
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
        clearSelectedLesson,
        deleteLesson,
        finishOrStartLesson,
        loadLastLesson,
        loadLessons,
        saveLesson,
        updateLesson,
    }
}

export default useLessons;