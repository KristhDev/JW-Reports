import { useSelector } from 'react-redux';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    addCourses as addCoursesAction,
    setIsCoursesLoading as setIsCoursesLoadingAction,
    setCourses as setCoursesAction,
    setCoursesPagination as setCoursesPaginationAction,
    setHasMoreCourses,
} from '../features/courses';

import { useAuth, useStatus } from './';

import { Course, CourseFilter, CoursesState } from '../interfaces/courses';
import { Pagination } from '../interfaces/ui';

const useCourses = () => {
    const dispatch = useAppDispatch();

    const state = useSelector<RootState, CoursesState>(store => store.courses);

    const { state: { user } } = useAuth();
    const { setSupabaseError } = useStatus();

    const addCourses = (courses: Course[]) => dispatch(addCoursesAction({ courses }));
    const setIsCoursesLoading = (isLoading: boolean) => dispatch(setIsCoursesLoadingAction({ isLoading }));
    const setCourses = (courses: Course[]) => dispatch(setCoursesAction({ courses }));
    const setCoursesPagination = (pagination: Pagination) => dispatch(setCoursesPaginationAction({ pagination }));

    const loadCourses = async (filter: CourseFilter, refresh: boolean = false, loadMore: boolean = false) => {
        setIsCoursesLoading(true);

        const coursesPromise = supabase.from('courses').select().eq('user_id', user.id);

        if (filter === 'continued') {
            coursesPromise.eq('discontinued', true);
        }
        else if (filter === 'discontinued') {
            coursesPromise.eq('discontinued', false);
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

    return {
        state,

        // Functions
        loadCourses
    }
}

export default useCourses;