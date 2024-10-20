import { useNavigation } from '@react-navigation/native';

/* Supabase */
import { supabase } from '@config';

/* Adapters */
import { courseAdapter, courseFormValuesAdapter } from '../adapters';

/* Features */
import { useAppDispatch, useAppSelector } from '@features';
import {
    INIT_COURSE,
    addCourse,
    addCourses as addCoursesAction,
    clearCourses as clearCoursesAction,
    removeCourse,
    removeCourses as removeCoursesAction,
    setCourseFilter,
    setCourses as setCoursesAction,
    setCoursesPagination as setCoursesPaginationAction,
    setCoursesScreenHistory as setCoursesScreenHistoryAction,
    setHasMoreCourses,
    setIsCourseDeleting,
    setIsCourseLoading,
    setIsCoursesLoading as setIsCoursesLoadingAction,
    setRefreshCourses as setRefreshCoursesAction,
    setSelectedCourse as setSelectedCourseAction,
    updateCourse as updateCourseAction
} from '../features';

/* Hooks */
import { addLastLesson, useLessons } from '@lessons';
import { useStatus, useNetwork } from '@shared';

/* Interfaces */
import { Course, CourseFormValues, loadCoursesOptions, CourseEndpoint } from '../interfaces';
import { Pagination } from '@ui';

/* Utils */
import { date } from '@utils';
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

    const { setStatus, setSupabaseError, setUnauthenticatedError, setNetworkError } = useStatus();
    const { loadLastLesson } = useLessons();

    const addCourses = (courses: Course[]) => dispatch(addCoursesAction({ courses }));
    const clearCourses = () => dispatch(clearCoursesAction());
    const removeCourses = () => dispatch(removeCoursesAction());
    const setCourses = (courses: Course[]) => dispatch(setCoursesAction({ courses }));
    const setCoursesPagination = (pagination: Pagination) => dispatch(setCoursesPaginationAction({ pagination }));
    const setCoursesScreenHistory = (newScreen: string) => dispatch(setCoursesScreenHistoryAction({ newScreen }));
    const setIsCoursesLoading = (isLoading: boolean) => dispatch(setIsCoursesLoadingAction({ isLoading }));
    const setRefreshCourses = (refresh: boolean) => dispatch(setRefreshCoursesAction({ refresh }));
    const setSelectedCourse = (course: Course) => dispatch(setSelectedCourseAction({ course }));

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

        dispatch(setIsCourseLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsCourseLoading({ isLoading: false }));
                onFinish && onFinish();
            });

            return;
        }

        /* Should not update if selectedCourse.id is an empty string */
        if (state.selectedCourse.id === '') {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED });

            return;
        }

        /* If the selectedCourse is finished it should not be updated */
        if (state.selectedCourse.finished) {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
            setStatus({ code: 400, msg: coursesMessages.FINISHED });

            return;
        }

        const { data, error, status } = await supabase.from('courses')
            .update({
                suspended: !state.selectedCourse.suspended,
                updated_at: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id)
            .select<'*', CourseEndpoint>()
            .single();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        const msg = (data!.suspended) ? coursesMessages.SUSPENDED_SUCCESS : coursesMessages.RENEW_SUCCESS;

        dispatch(updateCourseAction({ course: courseAdapter(data!) }));

        if (user.precursor === 'ninguno' && lastLesson.courseId === state.selectedCourse.id) {
            dispatch(addLastLesson({
                lesson: {
                    ...lastLesson,
                    course: courseAdapter(data!)
                }
            }));
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

        dispatch(setIsCourseDeleting({ isDeleting: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                onFinish && onFinish();
                dispatch(setIsCourseDeleting({ isDeleting: false }));
            });

            return;
        }

        /* Should not delete if selectedCourse.id is an empty string */
        if (state.selectedCourse.id === '') {
            onFinish && onFinish();
            dispatch(setIsCourseDeleting({ isDeleting: false }));
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED_DELETE });

            return;
        }

        const { error: lessonsError, status: lessonsStatus } = await supabase.from('lessons')
            .delete()
            .eq('course_id', state.selectedCourse.id);

        const nextLesson = setSupabaseError(lessonsError, lessonsStatus, () => {
            onFinish && onFinish();
            dispatch(setIsCourseDeleting({ isDeleting: false }));
        });

        if (nextLesson) return;

        const { error, status } = await supabase.from('courses')
            .delete()
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id);

        const next = setSupabaseError(error, status, () => {
            onFinish && onFinish();
            dispatch(setIsCourseDeleting({ isDeleting: false }));
        });

        if (next) return;

        if (user.precursor === 'ninguno' && lastLesson.courseId === state.selectedCourse.id) {
            await loadLastLesson();
        }

        dispatch(removeCourse({ id: state.selectedCourse.id }));

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

        dispatch(setIsCourseLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsCourseLoading({ isLoading: false }));
                onFinish && onFinish();
            });

            return;
        }

        /* Should not update if selectedCourse.id is an empty string */
        if (state.selectedCourse.id === '') {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED });

            return;
        }

        /* If the selectedCourse is suspended it should not be updated */
        if (state.selectedCourse.suspended) {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED_FINISH_OR_START });

            return;
        }

        const { data, error, status } = await supabase.from('courses')
            .update({
                finished: !state.selectedCourse.finished,
                updated_at: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id)
            .select<'*', CourseEndpoint>()
            .single();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        const msg = (data!.finished) ? coursesMessages.FINISHED_SUCCESS : coursesMessages.RESTARTED_SUCCESS;

        dispatch(updateCourseAction({ course: courseAdapter(data!) }));

        if (user.precursor === 'ninguno' && lastLesson.courseId === state.selectedCourse.id) {
            dispatch(addLastLesson({
                lesson: {
                    ...lastLesson,
                    course: courseAdapter(data!)
                }
            }));
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

        setIsCoursesLoading(true);

        if (!isAuthenticated) {
            setUnauthenticatedError(() => setIsCoursesLoading(false));
            return;
        }

        const coursesPromise = supabase.from('courses')
            .select('*, lessons (*)')
            .eq('user_id', user.id)

        if (filter === 'active') coursesPromise.eq('suspended', false).eq('finished', false)
        else if (filter === 'suspended') coursesPromise.eq('suspended', true).eq('finished', false)
        else if (filter === 'finished') coursesPromise.eq('suspended', false).eq('finished', true);

        if (search.trim().length > 0) {
            let searchQuery = `person_name.ilike.%${ search }%,`;
            searchQuery += `person_about.ilike.%${ search }%,`;
            searchQuery += `person_address.ilike.%${ search }%,`;
            searchQuery += `publication.ilike.%${ search }%`;

            coursesPromise.or(searchQuery);
        }

        coursesPromise.order('created_at', { ascending: false })
            .order('next_lesson', { ascending: false, referencedTable: 'lessons' })
            .limit(1, { foreignTable: 'lessons' })
            .range(
                (refresh) ? 0 : state.coursesPagination.from,
                (refresh) ? 9 : state.coursesPagination.to
            )

        const { data, error, status } = await coursesPromise;

        const next = setSupabaseError(error, status, () => setIsCoursesLoading(false));
        if (next) return;

        if (data!.length >= 10) {
            setCoursesPagination({
                from: (refresh) ? 10 : state.coursesPagination.from + 10,
                to: (refresh) ? 19 : state.coursesPagination.to + 10
            });
        }

        const courses = data!.map(({ lessons, ...rest }) => courseAdapter({
            ...rest,
            last_lesson: lessons[0],
        } as CourseEndpoint));

        dispatch(setHasMoreCourses({ hasMore: (courses!.length >= 10) }));
        (loadMore) ? addCourses(courses!) : setCourses(courses!);
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

        dispatch(setIsCourseLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                onFinish && onFinish();
                dispatch(setIsCourseLoading({ isLoading: false }));
            });

            return;
        }

        const { data, error, status } = await supabase.from('courses')
            .insert({ ...courseFormValuesAdapter(courseValues), user_id: user.id })
            .select<'*', CourseEndpoint>()
            .single();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        dispatch(addCourse({ course: courseAdapter(data!) }));
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

        dispatch(setIsCourseLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsCourseLoading({ isLoading: false }));
            });

            return;
        }

        if (state.selectedCourse.id === '') {
            dispatch(setIsCourseLoading({ isLoading: false }));
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED_UPDATE });

            return;
        }

        const { data, error, status } = await supabase.from('courses')
            .update({
                ...courseFormValuesAdapter(courseValues),
                updated_at: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id)
            .select<'*', CourseEndpoint>()
            .single();

        const next = setSupabaseError(error, status, () => dispatch(setIsCourseLoading({ isLoading: false })));
        if (next) return;

        dispatch(updateCourseAction({ course: courseAdapter(data!) }));

        if (user.precursor === 'ninguno' && lastLesson.courseId === state.selectedCourse.id) {
            dispatch(addLastLesson({
                lesson: {
                    ...lastLesson,
                    course: courseAdapter(data!)
                }
            }));
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
