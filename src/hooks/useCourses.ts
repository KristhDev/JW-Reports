import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    addCourse,
    addCourses as addCoursesAction,
    removeCourse,
    removeCourses as removeCoursesAction,
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
} from '../features/courses';

import { useAuth, useStatus } from './';

import { Course, CourseFilter, CoursesState } from '../interfaces/courses';
import { Pagination } from '../interfaces/ui';
import { CourseFormValues } from '../components/courses/CourseForm/interfaces';

const useCourses = () => {
    const dispatch = useAppDispatch();
    const { navigate } = useNavigation();

    const state = useSelector<RootState, CoursesState>(store => store.courses);

    const { state: { user } } = useAuth();
    const { setStatus, setSupabaseError } = useStatus();

    const addCourses = (courses: Course[]) => dispatch(addCoursesAction({ courses }));
    const removeCourses = () => dispatch(removeCoursesAction());
    const setCourses = (courses: Course[]) => dispatch(setCoursesAction({ courses }));
    const setCoursesPagination = (pagination: Pagination) => dispatch(setCoursesPaginationAction({ pagination }));
    const setCoursesScreenHistory = (newScreen: string) => dispatch(setCoursesScreenHistoryAction({ newScreen }));
    const setIsCoursesLoading = (isLoading: boolean) => dispatch(setIsCoursesLoadingAction({ isLoading }));
    const setRefreshCourses = (refresh: boolean) => dispatch(setRefreshCoursesAction({ refresh }));
    const setSelectedCourse = (course: Course) => dispatch(setSelectedCourseAction({ course }));

    const loadCourses = async (filter: CourseFilter, refresh: boolean = false, loadMore: boolean = false) => {
        setIsCoursesLoading(true);

        const coursesPromise = supabase.from('courses').select().eq('user_id', user.id);

        if (filter === 'active') coursesPromise.eq('suspended', false);
        else if (filter === 'suspended') coursesPromise.eq('suspended', true);

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

    const activeOrSuspendCourse = async (onFinish?: () => void) => {
        dispatch(setIsCourseLoading({ isLoading: true }));

        if (state.selectedCourse.id === '') {
            dispatch(setIsCourseLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No hay una curso seleccionado para eliminar.'
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
            : 'Haz comenzado de nuevo el curso correctamente.'

        dispatch(updateCourseAction({ course: data![0] }));
        onFinish && onFinish();

        setStatus({ code: 200, msg });
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

        navigate('CoursesTopTabsNavigation' as never);
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

    const deleteCourse = async (back: boolean = false, onFinish?: () => void) => {
        dispatch(setIsCourseDeleting({ isDeleting: true }));

        if (state.selectedCourse.id === '') {
            onFinish && onFinish();
            dispatch(setIsCourseDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay una curso seleccionado para eliminar.'
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

        setSelectedCourse({
            id: '',
            user_id: '',
            person_name: '',
            person_about: '',
            person_address: '',
            publication: '',
            suspended: false,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        });

        setStatus({
            code: 200,
            msg: 'Haz eliminado el curso correctamente.'
        });
    }

    return {
        state,

        // Actions
        removeCourses,
        setCoursesPagination,
        setCoursesScreenHistory,
        setRefreshCourses,
        setSelectedCourse,

        // Functions
        activeOrSuspendCourse,
        deleteCourse,
        loadCourses,
        saveCourse,
        updateCourse
    }
}

export default useCourses;