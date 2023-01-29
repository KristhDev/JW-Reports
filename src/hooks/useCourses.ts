import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    INIT_COURSE,
    addCourse,
    addCourses as addCoursesAction,
    addLesson,
    addLessons as addLessonsAction,
    clearCourses as clearCoursesAction,
    removeCourse,
    removeCourses as removeCoursesAction,
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
    setIsLessonLoading,
    setIsLessonsLoading as setIsLessonsLoadingAction,
    setLessons as setLessonsAction,
    setLessonsPagination as setLessonsPaginationAction,
    setRefreshCourses as setRefreshCoursesAction,
    setSelectedCourse as setSelectedCourseAction,
    setSelectedLesson as setSelectedLessonAction,
    updateCourse as updateCourseAction,
    updateLesson as updateLessonAction
} from '../features/courses';

import { useAuth, useStatus } from './';

import { Course, CourseFilter, CoursesState, Lesson } from '../interfaces/courses';
import { Pagination } from '../interfaces/ui';
import { CourseFormValues } from '../components/courses/CourseForm/interfaces';
import { LessonFormValues } from '../components/courses/LessonForm/interfaces';

const useCourses = () => {
    const dispatch = useAppDispatch();
    const { navigate } = useNavigation();

    const state = useSelector<RootState, CoursesState>(store => store.courses);

    const { state: { user } } = useAuth();
    const { setStatus, setSupabaseError } = useStatus();

    const addCourses = (courses: Course[]) => dispatch(addCoursesAction({ courses }));
    const addLessons = (lessons: Lesson[]) => dispatch(addLessonsAction({ lessons }));
    const clearCourses = () => dispatch(clearCoursesAction());
    const removeCourses = () => dispatch(removeCoursesAction());
    const removeLessons = () => dispatch(removeLessonsAction());
    const setCourses = (courses: Course[]) => dispatch(setCoursesAction({ courses }));
    const setCoursesPagination = (pagination: Pagination) => dispatch(setCoursesPaginationAction({ pagination }));
    const setCoursesScreenHistory = (newScreen: string) => dispatch(setCoursesScreenHistoryAction({ newScreen }));
    const setIsCoursesLoading = (isLoading: boolean) => dispatch(setIsCoursesLoadingAction({ isLoading }));
    const setIsLessonsLoading = (isLoading: boolean) => dispatch(setIsLessonsLoadingAction({ isLoading }));
    const setLessons = (lessons: Lesson[]) => dispatch(setLessonsAction({ lessons }));
    const setLessonsPagination = (pagination: Pagination) => dispatch(setLessonsPaginationAction({ pagination }));
    const setRefreshCourses = (refresh: boolean) => dispatch(setRefreshCoursesAction({ refresh }));
    const setSelectedCourse = (course: Course) => dispatch(setSelectedCourseAction({ course }));
    const setSelectedLesson = (lesson: Lesson) => dispatch(setSelectedLessonAction({ lesson }));

    const activeOrSuspendCourse = async (onFinish?: () => void) => {
        dispatch(setIsCourseLoading({ isLoading: true }));

        if (state.selectedCourse.id === '') {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No hay un curso seleccionado.'
            });

            return;
        }

        if (state.selectedCourse.finished) {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No pudes suspender o renovar un curso terminado.'
            });

            return;
        }

        const { data, error } = await supabase.from('courses')
            .update({
                suspended: !state.selectedCourse.suspended,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id)
            .select();

        const next = setSupabaseError(error, () => {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        const msg = (data![0].suspended)
            ? 'Haz suspendido el curso correctamente.'
            : 'Haz renovado el curso correctamente.'

        dispatch(updateCourseAction({ course: data![0] }));

        onFinish && onFinish();

        setStatus({ code: 200, msg });
    }

    const deleteCourse = async (back: boolean = false, onFinish?: () => void) => {
        dispatch(setIsCourseDeleting({ isDeleting: true }));

        if (state.selectedCourse.id === '') {
            onFinish && onFinish();
            dispatch(setIsCourseDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay un curso seleccionado para eliminar.'
            });

            return;
        }

        const { error } = await supabase.from('courses')
            .delete()
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id);

        const next = setSupabaseError(error, () => {
            onFinish && onFinish();
            dispatch(setIsCourseDeleting({ isDeleting: false }));
        });

        if (next) return;

        dispatch(removeCourse({ id: state.selectedCourse.id }));
        onFinish && onFinish();
        back && navigate('CoursesScreen' as never);

        setSelectedCourse(INIT_COURSE);

        setStatus({
            code: 200,
            msg: 'Haz eliminado el curso correctamente.'
        });
    }

    const finishOrStartCourse = async (onFinish?: () => void) => {
        dispatch(setIsCourseLoading({ isLoading: true }));

        if (state.selectedCourse.id === '') {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No hay un curso seleccionado.'
            });

            return;
        }

        if (state.selectedCourse.suspended) {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No pudes terminar o comenzar de nuevo un curso suspendido.'
            });

            return;
        }

        const { data, error } = await supabase.from('courses')
            .update({
                finished: !state.selectedCourse.finished,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id)
            .select();

        const next = setSupabaseError(error, () => {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        const msg = (data![0].finished)
            ? 'Haz terminado el curso correctamente.'
            : 'Haz comenzado de nuevo el curso correctamente.'

        dispatch(updateCourseAction({ course: data![0] }));

        onFinish && onFinish();

        setStatus({ code: 200, msg });
    }

    const loadCourses = async (filter: CourseFilter, refresh: boolean = false, loadMore: boolean = false) => {
        dispatch(setCourseFilter({ filter }));
        setIsCoursesLoading(true);

        const coursesPromise = supabase.from('courses').select().eq('user_id', user.id);

        if (filter === 'active') {
            coursesPromise.eq('suspended', false)
                .eq('finished', false)
        }
        else if (filter === 'suspended') {
            coursesPromise.eq('suspended', true)
                .eq('finished', false)
        }
        else if (filter === 'finished') {
            coursesPromise.eq('suspended', false)
                .eq('finished', true);
        }

        coursesPromise.order('created_at', { ascending: false })
            .range(
                (refresh) ? 0 : state.coursesPagination.from,
                (refresh) ? 9 : state.coursesPagination.to
            )

        const { data, error } = await coursesPromise;

        const next = setSupabaseError(error, () => setIsCoursesLoading(false));
        if (next) return;

        if (data!.length >= 10) {
            setCoursesPagination({
                from: (refresh) ? 10 : state.coursesPagination.from + 10,
                to: (refresh) ? 19 : state.coursesPagination.to + 10
            });
        }

        dispatch(setHasMoreCourses({ hasMore: (data!.length >= 10) }));
        (loadMore) ? addCourses(data!) : setCourses(data!);
    }

    const loadLessons = async (refresh: boolean = false, loadMore: boolean = false) => {
        setIsLessonsLoading(true);

        const { data, error } = await supabase.from('lessons')
            .select()
            .eq('course_id', state.selectedCourse.id)
            .range(
                (refresh) ? 0 : state.lessonsPagination.from,
                (refresh) ? 9 : state.lessonsPagination.to
            );

        const next = setSupabaseError(error, () => setIsLessonsLoading(false));
        if (next) return;

        if (data!.length >= 10) {
            setLessonsPagination({
                from: (refresh) ? 10 : state.lessonsPagination.from + 10,
                to: (refresh) ? 19 : state.lessonsPagination.to + 10
            });
        }

        dispatch(setHasMoreLessons({ hasMore: (data!.length >= 10) }));
        (loadMore) ? addLessons(data!) : setLessons(data!);
    }

    const saveCourse = async (courseValues: CourseFormValues, onFinish?: () => void) => {
        dispatch(setIsCourseLoading({ isLoading: true }));

        const { data, error } = await supabase.from('courses')
            .insert({ ...courseValues, user_id: user.id })
            .select();

        const next = setSupabaseError(error, () => {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        dispatch(addCourse({ course: data![0] }));
        onFinish && onFinish();

        setStatus({
            code: 201,
            msg: 'Haz agregado un curso correctamente'
        });

        navigate({
            name: 'CoursesStackNavigation',
            params: {
                screen: 'CoursesTopTabsNavigation'
            }
        } as never);
    }

    const saveLesson = async (lessonValues: LessonFormValues) => {
        dispatch(setIsLessonLoading({ isLoading: true }));

        const { data, error } = await supabase.from('lessons')
            .insert({
                course_id: state.selectedCourse.id,
                description: lessonValues.description,
                next_lesson: dayjs(lessonValues.next_lesson).format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .select();

        const next = setSupabaseError(error, () => {
            dispatch(setIsLessonLoading({ isLoading: false }));
        });

        if (next) return;

        if (state.lessons.length > 0) {

        }

        dispatch(setIsLessonLoading({ isLoading: false }));
        dispatch(addLesson({ lesson: data![0] }));

        setStatus({
            code: 201,
            msg: 'Haz agregado una clase al curso correctamente.'
        });

        navigate('LessonsScreen' as never);
    }

    const updateCourse = async (courseValues: CourseFormValues) => {
        dispatch(setIsCourseLoading({ isLoading: true }));

        const { data, error } = await supabase.from('courses')
            .update({
                ...courseValues,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedCourse.id)
            .eq('user_id', user.id)
            .select();

        const next = setSupabaseError(error, () => dispatch(setIsCourseLoading({ isLoading: false })));
        if (next) return;

        dispatch(updateCourseAction({ course: data![0] }));

        setStatus({
            code: 200,
            msg: 'Haz actualizado el curso correctamente.'
        });

        navigate('CoursesTopTabsNavigation' as never);
    }

    const updateLesson = async (lessonValues: LessonFormValues) => {
        dispatch(setIsLessonLoading({ isLoading: true }));

        const { data, error } = await supabase.from('lessons')
            .update({
                ...lessonValues,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedLesson.id)
            .eq('course_id', state.selectedCourse.id)
            .select();

        const next = setSupabaseError(error, () => dispatch(setIsLessonLoading({ isLoading: false })));
        if (next) return;

        dispatch(updateLessonAction({ lesson: data![0] }));

        setStatus({
            code: 200,
            msg: 'Haz actualizado la clase correctamente.'
        });

        navigate('LessonsScreen' as never);
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
        finishOrStartCourse,
        loadCourses,
        loadLessons,
        saveCourse,
        saveLesson,
        updateCourse,
        updateLesson,
    }
}

export default useCourses;