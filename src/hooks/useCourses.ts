import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../supabase';

/* Adapters */
import { courseAdapter, courseFormValuesAdapter, lessonAdapter } from '../adapters';

/* Features */
import {
    INIT_COURSE,
    INIT_LESSON,
    addCourse,
    addCourses as addCoursesAction,
    addLastLesson,
    addLesson,
    addLessons as addLessonsAction,
    clearCourses as clearCoursesAction,
    removeCourse,
    removeCourses as removeCoursesAction,
    removeLesson,
    removeLessons as removeLessonsAction,
    setCourseFilter,
    setCourses as setCoursesAction,
    setCoursesPagination as setCoursesPaginationAction,
    setCoursesScreenHistory as setCoursesScreenHistoryAction,
    setHasMoreCourses,
    setHasMoreLessons,
    setIsCourseDeleting,
    setIsCourseLoading,
    setIsCoursesLoading as setIsCoursesLoadingAction,
    setIsLastLessonLoading as setIsLastLessonLoadingAction,
    setIsLessonDeleting,
    setIsLessonLoading,
    setIsLessonsLoading as setIsLessonsLoadingAction,
    setLessons as setLessonsAction,
    setLessonsPagination as setLessonsPaginationAction,
    setRefreshCourses as setRefreshCoursesAction,
    setSelectedCourse as setSelectedCourseAction,
    setSelectedLesson as setSelectedLessonAction,
    updateCourse as updateCourseAction,
    updateLesson as updateLessonAction,
    useAppDispatch,
    useAppSelector
} from '../features';

/* Hooks */
import { useAuth, useStatus, useNetwork } from './';

/* Interfaces */
import {
    Course,
    CourseFormValues,
    Lesson,
    LessonWithCourseEndpoint,
    LessonFormValues,
    loadCoursesOptions,
    LoadResourcesOptions,
    Pagination,
    CourseEndpoint,
    LessonEndpoint
} from '../interfaces';
/**
 * Hook to management courses of store with state and actions
 */
const useCourses = () => {
    const dispatch = useAppDispatch();
    const { goBack, navigate } = useNavigation();
    const { wifi } = useNetwork();

    const state = useAppSelector(store => store.courses);

    const { state: { isAuthenticated, user } } = useAuth();
    const { setStatus, setSupabaseError, setUnauthenticatedError, setNetworkError } = useStatus();

    const addCourses = (courses: Course[]) => dispatch(addCoursesAction({ courses }));
    const addLessons = (lessons: Lesson[]) => dispatch(addLessonsAction({ lessons }));
    const clearCourses = () => dispatch(clearCoursesAction());
    const removeCourses = () => dispatch(removeCoursesAction());
    const removeLessons = () => dispatch(removeLessonsAction());
    const setCourses = (courses: Course[]) => dispatch(setCoursesAction({ courses }));
    const setCoursesPagination = (pagination: Pagination) => dispatch(setCoursesPaginationAction({ pagination }));
    const setCoursesScreenHistory = (newScreen: string) => dispatch(setCoursesScreenHistoryAction({ newScreen }));
    const setIsCoursesLoading = (isLoading: boolean) => dispatch(setIsCoursesLoadingAction({ isLoading }));
    const setIsLastLessonLoading = (isLoading: boolean) => dispatch(setIsLastLessonLoadingAction({ isLoading }));
    const setIsLessonsLoading = (isLoading: boolean) => dispatch(setIsLessonsLoadingAction({ isLoading }));
    const setLessons = (lessons: Lesson[]) => dispatch(setLessonsAction({ lessons }));
    const setLessonsPagination = (pagination: Pagination) => dispatch(setLessonsPaginationAction({ pagination }));
    const setRefreshCourses = (refresh: boolean) => dispatch(setRefreshCoursesAction({ refresh }));
    const setSelectedCourse = (course: Course) => dispatch(setSelectedCourseAction({ course }));
    const setSelectedLesson = (lesson: Lesson) => dispatch(setSelectedLessonAction({ lesson }));

    /**
     * This function is responsible for activating or suspending a course.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const activeOrSuspendCourse = async (onFinish?: () => void): Promise<void> => {
        if (!wifi.isConnected) {
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

            setStatus({
                code: 400,
                msg: 'No hay un curso seleccionado.'
            });

            return;
        }

        /* If the selectedCourse is finished it should not be updated */
        if (state.selectedCourse.finished) {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No puedes suspender o renovar un curso terminado.'
            });

            return;
        }

        const { data, error, status } = await supabase.from('courses')
            .update({
                suspended: !state.selectedCourse.suspended,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id)
            .select<'*', CourseEndpoint>();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        const msg = (data![0].suspended)
            ? 'Haz suspendido el curso correctamente.'
            : 'Haz renovado el curso correctamente.'

        dispatch(updateCourseAction({ course: courseAdapter(data![0]) }));

        if (user.precursor === 'ninguno' && state.lastLesson.courseId === state.selectedCourse.id) {
            dispatch(addLastLesson({
                lesson: {
                    ...state.lastLesson,
                    course: courseAdapter(data![0])
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
        if (!wifi.isConnected) {
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

            setStatus({
                code: 400,
                msg: 'No hay un curso seleccionado para eliminar.'
            });

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

        if (user.precursor === 'ninguno' && state.lastLesson.courseId === state.selectedCourse.id) {
            await loadLastLesson();
        }

        dispatch(removeCourse({ id: state.selectedCourse.id }));

        onFinish && onFinish();
        back && navigate('CoursesScreen' as never);

        setSelectedCourse(INIT_COURSE);

        setStatus({
            code: 200,
            msg: 'Haz eliminado el curso correctamente.'
        });
    }

    /**
     * It deletes a lesson from the database and updates the state of the app.
     *
     * @param {boolean} back - This parameter allows you to return to the previous screen, by default it is `false`
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deleteLesson = async (back: boolean = false, onFinish?: () => void): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsLessonDeleting({ isDeleting: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                onFinish && onFinish();
                dispatch(setIsLessonDeleting({ isDeleting: false }));
            });

            return;
        }

        /* Should not delete if selectedLesson.id is an empty string */
        if (state.selectedLesson.id === '') {
            onFinish && onFinish();
            dispatch(setIsLessonDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay una clase seleccionada para eliminar.'
            });

            return;
        }

        /* Cannot delete a class if the selectedCourse.user_id is different from user.id */
        if (state.selectedCourse.userId !== user.id) {
            onFinish && onFinish();
            dispatch(setIsLessonDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No tienes permiso para realizar está acción.'
            });

            return;
        }

        const { error, status } = await supabase.from('lessons')
            .delete()
            .eq('id', state.selectedLesson.id);

        const next = setSupabaseError(error, status, () => {
            onFinish && onFinish();
            dispatch(setIsLessonDeleting({ isDeleting: false }));
        });

        if (next) return;

        if (user.precursor === 'ninguno' && state.selectedLesson.id === state.lastLesson.id) {
            await loadLastLesson();
        }

        dispatch(removeLesson({ id: state.selectedLesson.id }));
        onFinish && onFinish();
        back && goBack();

        setSelectedLesson({
            ...INIT_LESSON,
            nextLesson: new Date().toString()
        });

        setStatus({
            code: 200,
            msg: 'Haz eliminado la clase correctamente.'
        });
    }

    /**
     * This function is to finish or start a course again.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const finishOrStartCourse = async (onFinish?: () => void): Promise<void> => {
        if (!wifi.isConnected) {
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

            setStatus({
                code: 400,
                msg: 'No hay un curso seleccionado.'
            });

            return;
        }

        /* If the selectedCourse is suspended it should not be updated */
        if (state.selectedCourse.suspended) {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No pudes terminar o comenzar de nuevo un curso suspendido.'
            });

            return;
        }

        const { data, error, status } = await supabase.from('courses')
            .update({
                finished: !state.selectedCourse.finished,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id)
            .select<'*', CourseEndpoint>();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        const msg = (data![0].finished)
            ? 'Haz terminado el curso correctamente.'
            : 'Haz comenzado de nuevo el curso correctamente.'

        dispatch(updateCourseAction({ course: courseAdapter(data![0]) }));

        if (user.precursor === 'ninguno' && state.lastLesson.courseId === state.selectedCourse.id) {
            dispatch(addLastLesson({
                lesson: {
                    ...state.lastLesson,
                    course: courseAdapter(data![0])
                }
            }));
        }

        onFinish && onFinish();

        setStatus({ code: 200, msg });
    }

    /**
     * This function is to finish or start a lesson again.
     *
     * @param {Date} next_lesson - This is date of next lesson
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const finishOrStartLesson = async (next_lesson: Date, onFinish?: () => void): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsLessonLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsLessonLoading({ isLoading: false }));
                onFinish && onFinish();
            });

            return;
        }

        /* Should not update if selectedLesson.id is an empty string */
        if (state.selectedLesson.id === '') {
            dispatch(setIsLessonLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No hay una clase seleccionada.'
            });

            return;
        }

        /* If the selectedCourse is suspended or finished it should not be updated */
        if (state.selectedCourse.suspended || state.selectedCourse.finished) {
            dispatch(setIsLessonLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No pudes terminar o reprogramar de nuevo una clase de un curso suspendido o terminado.'
            });

            return;
        }

        const { data, error, status } = await supabase.from('lessons')
            .update({
                done: !state.selectedLesson.done,
                next_lesson: dayjs(next_lesson).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedLesson.id)
            .eq('course_id', state.selectedCourse.id)
            .select<'*', LessonEndpoint>();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsLessonLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        const msg = (data![0].done)
            ? 'Haz terminado la clase correctamente.'
            : 'Haz reprogrado la clase correctamente.'

        dispatch(updateLessonAction({ lesson: lessonAdapter((data as any)![0]) }));

        if ((user.precursor !== 'ninguno')) await loadLastLesson();

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

        if (!wifi.isConnected) {
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
            .order('next_lesson', { ascending: false, foreignTable: 'lessons' })
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
            last_lesson: lessons[0]
        } as CourseEndpoint));

        dispatch(setHasMoreCourses({ hasMore: (courses!.length >= 10) }));
        (loadMore) ? addCourses(courses!) : setCourses(courses!);
    }

    /**
     * Loads the last lesson asynchronously.
     *
     * @return {Promise<void>} Promise that resolves when the last lesson is loaded.
     */
    const loadLastLesson = async (): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        setIsLastLessonLoading(true);

        if (!isAuthenticated) {
            setUnauthenticatedError(() => setIsLastLessonLoading(false));
            return;
        }

        const { data: dataCourses, error: errorCourses, status: statusCourses, } = await supabase.from('courses')
            .select('id')
            .eq('user_id', user.id);

        const next = setSupabaseError(errorCourses, statusCourses, () => setIsLastLessonLoading(false));
        if (next) return;

        const { data, error, status } = await supabase.from('lessons')
            .select<'*, courses (*)', LessonWithCourseEndpoint>('*, courses (*)')
            .in('course_id', [ dataCourses!.map(({ id }) => id) ])
            .order('next_lesson', { ascending: false })
            .limit(1);

        const nextLesson = setSupabaseError(error, status, () => setIsLastLessonLoading(false));
        if (nextLesson) return;

        dispatch(addLastLesson({
            lesson: (data?.length && data.length > 0)
                ? {
                    ...lessonAdapter(data![0]),
                    course: courseAdapter(data![0].courses)
                }
                : {
                    ...INIT_LESSON,
                    course: INIT_COURSE
                },
        }));
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
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        setIsLessonsLoading(true);

        if (!isAuthenticated) {
            setUnauthenticatedError(() => setIsLessonsLoading(false));
            return;
        }

         /* Should not update if selectedCourse .id is an empty string */
        if (state.selectedCourse.id === '') {
            setIsLessonsLoading(false);

            setStatus({
                code: 400,
                msg: 'No hay un curso seleccionado.'
            });

            return;
        }

        const lessonsPromise = supabase.from('lessons')
            .select<'*', LessonEndpoint>()
            .eq('course_id', state.selectedCourse.id);

        if (search.trim().length > 0) lessonsPromise.ilike('description', `%${ search }%`);

        lessonsPromise.order('next_lesson', { ascending: false })
            .range(
                (refresh) ? 0 : state.lessonsPagination.from,
                (refresh) ? 9 : state.lessonsPagination.to
            );

        const { data, error, status } = await lessonsPromise;

        const next = setSupabaseError(error, status, () => setIsLessonsLoading(false));
        if (next) return;

        if (data!.length >= 10) {
            setLessonsPagination({
                from: (refresh) ? 10 : state.lessonsPagination.from + 10,
                to: (refresh) ? 19 : state.lessonsPagination.to + 10
            });
        }

        const lessons = data!.map(lessonAdapter);

        dispatch(setHasMoreLessons({ hasMore: (data!.length >= 10) }));
        (loadMore) ? addLessons(lessons) : setLessons(lessons);
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
        if (!wifi.isConnected) {
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
            .select<'*', CourseEndpoint>();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        dispatch(addCourse({ course: courseAdapter((data)![0]) }));
        onFinish && onFinish();

        setStatus({
            code: 201,
            msg: 'Haz agregado un curso correctamente.'
        });

        navigate({
            name: 'CoursesStackNavigation',
            params: {
                screen: 'CoursesTopTabsNavigation'
            }
        } as never);
    }

    /**
     * This function saves a lesson to the database and then navigates to the LessonsScreen.
     *
     * @param {LessonFormValues} lessonValues - This is a values for save lesson
     * @return {Promise<void>} This function does not return anything.
     */
    const saveLesson = async (lessonValues: LessonFormValues): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsLessonLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsLessonLoading({ isLoading: false }));
            });

            return;
        }

        const { data, error, status } = await supabase.from('lessons')
            .insert({
                course_id: state.selectedCourse.id,
                description: lessonValues.description,
                next_lesson: dayjs(lessonValues.nextLesson).format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .select<'*', LessonEndpoint>();

        const next = setSupabaseError(error, status, () => dispatch(setIsLessonLoading({ isLoading: false })));
        if (next) return;

        if (state.lessons.length > 0) dispatch(addLesson({ lesson: lessonAdapter(data![0]) }));
        else dispatch(setIsLessonLoading({ isLoading: false }));

        if (user.precursor === 'ninguno') await loadLastLesson();

        setStatus({
            code: 201,
            msg: 'Haz agregado una clase al curso correctamente.'
        });

        navigate('LessonsScreen' as never);
    }

    /**
     * This function updates a course in the database and then updates the state with the updated
     * course.
     *
     * @param {CourseFormValues} courseValues - This is a values for update course
     * @return {Promise<void>} This function does not return anything.
     */
    const updateCourse = async (courseValues: CourseFormValues): Promise<void> => {
        if (!wifi.isConnected) {
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

            setStatus({
                code: 400,
                msg: 'No hay un curso seleccionado para actualizar.'
            });

            return;
        }

        const { data, error, status } = await supabase.from('courses')
            .update({
                ...courseFormValuesAdapter(courseValues),
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id)
            .select<'*', CourseEndpoint>();

        const next = setSupabaseError(error, status, () => dispatch(setIsCourseLoading({ isLoading: false })));
        if (next) return;

        dispatch(updateCourseAction({ course: courseAdapter(data![0]) }));

        if (user.precursor === 'ninguno' && state.lastLesson.courseId === state.selectedCourse.id) {
            dispatch(addLastLesson({
                lesson: {
                    ...state.lastLesson,
                    course: courseAdapter(data![0])
                }
            }));
        }

        setStatus({
            code: 200,
            msg: 'Haz actualizado el curso correctamente.'
        });

        goBack();
    }

    /**
     * It updates a lesson in the database and then updates the state with the updated lesson.
     *
     * @param {LessonFormValues} lessonValues - This is a values for update lesson
     * @return {Promise<void>} This function does not return anything.
     */
    const updateLesson = async (lessonValues: LessonFormValues): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsLessonLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsLessonLoading({ isLoading: false }));
            });

            return;
        }

        if (state.selectedLesson.id === '') {
            dispatch(setIsLessonLoading({ isLoading: false }));

            setStatus({
                code: 400,
                msg: 'No hay una clase seleccionada para actualizar.'
            });

            return;
        }

        const { data, error, status } = await supabase.from('lessons')
            .update({
                description: lessonValues.description,
                next_lesson: dayjs(lessonValues.nextLesson).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedLesson.id)
            .eq('course_id', state.selectedCourse.id)
            .select<'*', LessonEndpoint>();

        const next = setSupabaseError(error, status, () => dispatch(setIsLessonLoading({ isLoading: false })));
        if (next) return;

        const lesson = lessonAdapter(data![0]);

        dispatch(updateLessonAction({ lesson }));

        if ((user.precursor !== 'ninguno') && data![0].id === state.lastLesson.id) {
            dispatch(addLastLesson({ lesson: {
                ...lesson,
                course: state.lastLesson.course
            } }));
        }

        setStatus({
            code: 200,
            msg: 'Haz actualizado la clase correctamente.'
        });

        goBack();
    }

    return {
        state,

        // Actions
        clearCourses,
        removeCourses,
        removeLessons,
        setCoursesPagination,
        setCoursesScreenHistory,
        setLessonsPagination,
        setRefreshCourses,
        setSelectedCourse,
        setSelectedLesson,

        // Functions
        activeOrSuspendCourse,
        deleteCourse,
        deleteLesson,
        finishOrStartCourse,
        finishOrStartLesson,
        loadCourses,
        loadLastLesson,
        loadLessons,
        saveCourse,
        saveLesson,
        updateCourse,
        updateLesson
    }
}

export default useCourses;
