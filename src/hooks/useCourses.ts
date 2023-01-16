import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    addCourses as addCoursesAction,
    removeCourse,
    removeCourses as removeCoursesAction,
    setCourses as setCoursesAction,
    setCoursesPagination as setCoursesPaginationAction,
    setCoursesScreenHistory as setCoursesScreenHistoryAction,
    setHasMoreCourses,
    setIsCourseDeleting,
    setIsCoursesLoading as setIsCoursesLoadingAction,
    setRefreshCourses as setRefreshCoursesAction,
    setSelectedCourse as setSelectedCourseAction,
} from '../features/courses';

import { useAuth, useStatus } from './';

import { Course, CourseFilter, CoursesState } from '../interfaces/courses';
import { Pagination } from '../interfaces/ui';

const useCourses = () => {
    const dispatch = useAppDispatch();
    const { goBack } = useNavigation();

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

    const deleteCourse = async (back: boolean = false, onFinish?: () => void) => {
        dispatch(setIsCourseDeleting({ isDeleting: true }));

        if (state.selectedCourse.id === '') {
            onFinish && onFinish();
            dispatch(setIsCourseDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay una revisita seleccionada para eliminar.'
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
        back && goBack();

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
            msg: 'Haz eliminado tu revisita correctamente.'
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
        deleteCourse,
        loadCourses,
    }
}

export default useCourses;