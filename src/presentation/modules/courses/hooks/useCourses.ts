import { useNavigation } from '@react-navigation/native';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    INIT_COURSE,
    addCourse as addCourseAction,
    addCourses as addCoursesAction,
    addLastLesson as addLastLessonAction,
    clearCourses as clearCoursesAction,
    removeCourse as removeCourseAction,
    removeCourses as removeCoursesAction,
    setCourseFilter,
    Pagination,
    setCourses as setCoursesAction,
    setCoursesPagination as setCoursesPaginationAction,
    setCoursesScreenHistory as setCoursesScreenHistoryAction,
    setHasMoreCourses as setHasMoreCoursesAction,
    setIsCourseDeleting as setIsCourseDeletingAction,
    setIsCourseLoading as setIsCourseLoadingAction,
    setIsCoursesLoading as setIsCoursesLoadingAction,
    setRefreshCourses as setRefreshCoursesAction,
    setSelectedCourse as setSelectedCourseAction,
    updateCourse as updateCourseAction
} from '@application/features';

/* DTOs */
import { ActiveOrSuspendCourseDto, CreateCourseDto, FinishOrStartCourseDto, UpdateCourseDto } from '@domain/dtos';

/* Entities */
import { CourseEntity, LessonWithCourseEntity } from '@domain/entities';

/* Errors */
import { RequestError } from '@domain/errors';

/* Services */
import { CoursesService } from '../services';

/* Hooks */
import { LessonsService, useLessons } from '@lessons';
import { useStatus, useNetwork } from '@shared';

/* Interfaces */
import { CourseFormValues, loadCoursesOptions } from '../interfaces';

/* Utils */
import { coursesMessages } from '../utils';

/**
 * Hook to management courses of store with state and actions
 */
const useCourses = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { wifi } = useNetwork();

    const state = useAppSelector(store => store.courses);
    const { isAuthenticated, user } = useAppSelector(store => store.auth);
    const { lastLesson } = useAppSelector(store => store.lessons);

    const { setStatus, setUnauthenticatedError, setTranslatedError, setNetworkError } = useStatus();
    const { loadLastLesson } = useLessons();

    const addCourse = (course: CourseEntity) => dispatch(addCourseAction({ course }));
    const addCourses = (courses: CourseEntity[]) => dispatch(addCoursesAction({ courses }));
    const addLastLesson = (lesson: LessonWithCourseEntity) => dispatch(addLastLessonAction({ lesson }));
    const clearCourses = () => dispatch(clearCoursesAction());
    const removeCourse = (id: string) => dispatch(removeCourseAction({ id }));
    const removeCourses = () => dispatch(removeCoursesAction());
    const setCourses = (courses: CourseEntity[]) => dispatch(setCoursesAction({ courses }));
    const setCoursesPagination = (pagination: Pagination) => dispatch(setCoursesPaginationAction({ pagination }));
    const setCoursesScreenHistory = (newScreen: string) => dispatch(setCoursesScreenHistoryAction({ newScreen }));
    const setHasMoreCourses = (hasMore: boolean) => dispatch(setHasMoreCoursesAction({ hasMore }));
    const setIsCourseDeleting = (isDeleting: boolean) => dispatch(setIsCourseDeletingAction({ isDeleting }));
    const setIsCourseLoading = (isLoading: boolean) => dispatch(setIsCourseLoadingAction({ isLoading }));
    const setIsCoursesLoading = (isLoading: boolean) => dispatch(setIsCoursesLoadingAction({ isLoading }));
    const setRefreshCourses = (refresh: boolean) => dispatch(setRefreshCoursesAction({ refresh }));
    const setSelectedCourse = (course: CourseEntity) => dispatch(setSelectedCourseAction({ course }));
    const updateCourseActionState = (course: CourseEntity) => dispatch(updateCourseAction({ course }));

    /**
     * This function is responsible for activating or suspending a course.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const activeOrSuspendCourse = async (onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFinish && onFinish());
            return;
        }

        /* Should not update if selectedCourse.id is an empty string */
        if (state.selectedCourse.id === '') {
            onFinish && onFinish();
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED });

            return;
        }

        /* If the selectedCourse is finished it should not be updated */
        if (state.selectedCourse.finished) {
            onFinish && onFinish();
            setStatus({ code: 400, msg: coursesMessages.FINISHED });

            return;
        }

        setIsCourseLoading(true);

        const activeOrSuspendDto = ActiveOrSuspendCourseDto.create(!state.selectedCourse.suspended);
        const result = await CoursesService.activeOrSuspend(state.selectedCourse.id, user.id, activeOrSuspendDto);

        if (result instanceof RequestError) {
            setIsCourseLoading(false);
            onFinish && onFinish();
            setTranslatedError(result.status, result.message);

            return;
        }

        const msg = (result.suspended) ? coursesMessages.SUSPENDED_SUCCESS : coursesMessages.RENEW_SUCCESS;
        updateCourseActionState(result);

        if (user.precursor === 'ninguno' && lastLesson.courseId === state.selectedCourse.id) {
            addLastLesson({ ...lastLesson, course: result })
        }

        onFinish && onFinish();
        setStatus({ code: 200, msg });
    }

    /**
     * It deletes a course and all its lessons from the database.
     *
     * @param {boolean} back - This parameter allows you to return to the previous screen, by default it is `false`
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deleteCourse = async (back: boolean = false, onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFinish && onFinish());
            return;
        }

        /* Should not delete if selectedCourse.id is an empty string */
        if (state.selectedCourse.id === '') {
            onFinish && onFinish();
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED_DELETE });

            return;
        }

        setIsCourseDeleting(true);

        const result = await LessonsService.deleteLessonsByCourseId(state.selectedCourse.id);

        if (result instanceof RequestError) {
            setIsCourseDeleting(false);
            onFinish && onFinish();
            setTranslatedError(result.status, result.message);
        }

        const courseResult = await CoursesService.delete(state.selectedCourse.id, user.id);

        if (courseResult instanceof RequestError) {
            setIsCourseDeleting(false);
            onFinish && onFinish();
            setTranslatedError(courseResult.status, courseResult.message);
        }

        if (user.precursor === 'ninguno' && lastLesson.courseId === state.selectedCourse.id) {
            await loadLastLesson();
        }

        removeCourse(state.selectedCourse.id);

        onFinish && onFinish();
        back && navigation.navigate('CoursesScreen' as never);

        setSelectedCourse(INIT_COURSE);
        setStatus({ code: 200, msg: coursesMessages.DELETED_SUCCESS });
    }

    /**
     * This function is to finish or start a course again.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const finishOrStartCourse = async (onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFinish && onFinish());
            return;
        }

        /* Should not update if selectedCourse.id is an empty string */
        if (state.selectedCourse.id === '') {
            onFinish && onFinish();
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED });

            return;
        }

        /* If the selectedCourse is suspended it should not be updated */
        if (state.selectedCourse.suspended) {
            onFinish && onFinish();
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED_FINISH_OR_START });

            return;
        }

        setIsCourseLoading(true);

        const finishOrStartDto = FinishOrStartCourseDto.create(!state.selectedCourse.finished);
        const result = await CoursesService.finishOrStart(state.selectedCourse.id, user.id, finishOrStartDto);

        if (result instanceof RequestError) {
            setIsCourseLoading(false);
            onFinish && onFinish();
            setTranslatedError(result.status, result.message);

            return;
        }

        const msg = (result!.finished) ? coursesMessages.FINISHED_SUCCESS : coursesMessages.RESTARTED_SUCCESS;
        updateCourseActionState(result);

        if (user.precursor === 'ninguno' && lastLesson.courseId === state.selectedCourse.id) {
            addLastLesson({ ...lastLesson, course: result });
        }

        onFinish && onFinish();

        setStatus({ code: 200, msg });
    }

    /**
     * This function is to load the courses using the options that are passed by parameter, you can
     * load them for pagination or not.
     *
     * @param {loadCoursesOptions} { filter: CourseFilter, loadMore: boolean, refresh: boolean, search: string } - They are the options that are used to load the courses:
     * - filter: It is the filter of the courses to show them are: `all`, `active`, `suspended`, `finished`
     * - loadMore: This flag is used to add or set the courses that are requested, default is `false`
     * - refresh: This flag is to reset the pagination of the courses, default is `false`
     * - search: This is a search text to search courses, default is empty `string`
     * @return {Promise<void>} This function does not return anything.
     */
    const loadCourses = async ({ filter, loadMore = false, refresh = false, search = '' }: loadCoursesOptions): Promise<void> => {
        dispatch(setCourseFilter({ filter }));

        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }
        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        setIsCoursesLoading(true);

        const result = await CoursesService.getAllByUserId(user.id, {
            filter,
            search,
            pagination: {
                from: (refresh) ? 0 : state.coursesPagination.from,
                to: (refresh) ? 9 : state.coursesPagination.to
            }
        });

        if (result instanceof RequestError) {
            setIsCoursesLoading(false);
            setTranslatedError(result.status, result.message);
            return;
        }

        if (result.length >= 10) {
            setCoursesPagination({
                from: (refresh) ? 10 : state.coursesPagination.from + 10,
                to: (refresh) ? 19 : state.coursesPagination.to + 10
            });
        }

        setHasMoreCourses(result.length >= 10);
        (loadMore) ? addCourses(result) : setCourses(result);
    }

    /**
     * This function saves a course to the database and then navigates to the CoursesTopTabsNavigation
     * screen.
     *
     * @param {CourseFormValues} courseValues - This is a values for save course
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const saveCourse = async (courseValues: CourseFormValues, onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFinish && onFinish());
            return;
        }

        setIsCourseLoading(true);

        const createDto = CreateCourseDto.create({ ...courseValues, userId: user.id });
        const result = await CoursesService.create(createDto);

        if (result instanceof RequestError) {
            setIsCourseLoading(false);
            setTranslatedError(result.status, result.message);
            return;
        }

        addCourse(result);
        onFinish && onFinish();
        setStatus({ code: 201, msg: coursesMessages.ADDED_SUCCESS });

        navigation.navigate({
            name: 'CoursesStackNavigation',
            params: {
                screen: 'CoursesTopTabsNavigation'
            }
        } as never);
    }

    /**
     * This function updates a course in the database and then updates the state with the updated
     * course.
     *
     * @param {CourseFormValues} courseValues - This is a values for update course
     * @return {Promise<void>} This function does not return anything.
     */
    const updateCourse = async (courseValues: CourseFormValues): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        if (state.selectedCourse.id === '') {
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED_UPDATE });
            return;
        }

        setIsCourseLoading(true);

        const updateDto = UpdateCourseDto.create(courseValues);
        const result = await CoursesService.update(state.selectedCourse.id, user.id, updateDto);

        if (result instanceof RequestError) {
            setIsCourseLoading(false);
            setTranslatedError(result.status, result.message);
            return;
        }

        updateCourseActionState(result);

        if (user.precursor === 'ninguno' && lastLesson.courseId === state.selectedCourse.id) {
            addLastLesson({ ...lastLesson, course: result });
        }

        setStatus({ code: 200, msg: coursesMessages.UPDATED_SUCCESS });
        navigation.goBack();
    }

    return {
        state,

        // Actions
        clearCourses,
        removeCourses,
        setCoursesPagination,
        setCoursesScreenHistory,
        setRefreshCourses,
        setSelectedCourse,

        // Functions
        activeOrSuspendCourse,
        deleteCourse,
        finishOrStartCourse,
        loadCourses,
        saveCourse,
        updateCourse
    }
}

export default useCourses;
