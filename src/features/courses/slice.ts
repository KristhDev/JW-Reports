import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    Course,
    CourseClass,
    CourseFilter,
    CoursePayload,
    CoursesState,
    SetCoursesPayload,
    SetRefreshCoursesPayload
} from '../../interfaces/courses';

import {
    HasMorePayload,
    HistoryPayload,
    PaginationPayload,
    RemoveResourcePayload,
    SetIsDeletingPayload,
    SetIsLoadingPayload
} from '../../interfaces/features';

export const INIT_CLASS: CourseClass = {
    id: '',
    course_id: '',
    description: '',
    next_class: new Date().toString(),
    done: false,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
}

export const INIT_COURSE: Course = {
    id: '',
    user_id: '',
    person_name: '',
    person_about: '',
    person_address: '',
    publication: '',
    suspended: false,
    finished: false,
    created_at: new Date().toString(),
    updated_at: new Date().toString()
}

const INITIAL_STATE: CoursesState = {
    classes: [],
    classesPagination: {
        from: 0,
        to: 9,
    },
    courseFilter: 'all',
    courses: [],
    coursesPagination: {
        from: 0,
        to: 9,
    },
    coursesScreenHistory: [],
    hasMoreClasses: true,
    hasMoreCourses: true,
    isClassDeleting: false,
    isClassesLoading: false,
    isClassLoading: false,
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesLoading: false,
    refreshClasses: false,
    refreshCourses: false,
    selectedClass: INIT_CLASS,
    selectedCourse: INIT_COURSE
}

const filterCourses = (courses: Course[], filter: CourseFilter) => {
    let coursesFiltered: Course[] = [];

    if (filter === 'active') {
        coursesFiltered = courses.filter(c => !c.suspended && !c.finished);
    }
    else if (filter === 'suspended') {
        coursesFiltered = courses.filter(c => c.suspended && !c.finished);
    }
    else if (filter === 'finished') {
        coursesFiltered = courses.filter(c => !c.suspended && c.finished);
    }
    else coursesFiltered = courses;

    return coursesFiltered;
}

const courseSlice = createSlice({
    name: 'courses',
    initialState: INITIAL_STATE,
    reducers: {
        addCourse: (state, action: PayloadAction<CoursePayload>) => {
            state.courses = [ action.payload.course, ...state.courses ];
            state.courses = state.courses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            state.isCourseLoading = false;
        },

        addCourses: (state, action: PayloadAction<SetCoursesPayload>) => {
            state.courses = [ ...state.courses, ...action.payload.courses ];
            state.isCoursesLoading = false;
        },

        clearCourses: (state) => {
            state.classes = INITIAL_STATE.classes;
            state.classesPagination = INITIAL_STATE.classesPagination;
            state.courseFilter = INITIAL_STATE.courseFilter;
            state.courses = INITIAL_STATE.courses;
            state.coursesPagination = INITIAL_STATE.coursesPagination;
            state.coursesScreenHistory = INITIAL_STATE.coursesScreenHistory;
            state.hasMoreClasses = INITIAL_STATE.hasMoreClasses;
            state.hasMoreCourses = INITIAL_STATE.hasMoreCourses;
            state.isClassDeleting = INITIAL_STATE.isClassDeleting;
            state.isClassesLoading = INITIAL_STATE.isClassesLoading;
            state.isClassLoading = INITIAL_STATE.isClassLoading;
            state.isCourseDeleting = INITIAL_STATE.isCourseDeleting;
            state.isCourseLoading = INITIAL_STATE.isCourseLoading;
            state.isCoursesLoading = INITIAL_STATE.isCoursesLoading;
            state.refreshClasses = INITIAL_STATE.refreshClasses;
            state.refreshCourses = INITIAL_STATE.refreshCourses;
            state.selectedClass = INITIAL_STATE.selectedClass;
            state.selectedCourse = INITIAL_STATE.selectedCourse;
        },

        removeCourse: (state, action: PayloadAction<RemoveResourcePayload>) => {
            state.courses = state.courses.filter(r => r.id !== action.payload.id);
            state.isCourseDeleting = false;
        },

        removeCourses: (state) => {
            state.courses = [];
        },

        setCourseFilter: (state, action: PayloadAction<{ filter: CourseFilter }>) => {
            state.courseFilter = action.payload.filter;
        },

        setCourses: (state, action: PayloadAction<SetCoursesPayload>) => {
            state.courses = [ ...action.payload.courses ];
            state.isCoursesLoading = false;
        },

        setCoursesPagination: (state, action: PayloadAction<PaginationPayload>) => {
            state.coursesPagination = action.payload.pagination;
        },

        setCoursesScreenHistory: (state, action: PayloadAction<HistoryPayload>) => {
            state.coursesScreenHistory = [ ...state.coursesScreenHistory, action.payload.newScreen ]
        },

        setHasMoreCourses: (state, action: PayloadAction<HasMorePayload>) => {
            state.hasMoreCourses = action.payload.hasMore;
        },

        setIsCourseDeleting: (state, action: PayloadAction<SetIsDeletingPayload>) => {
            state.isCourseDeleting = action.payload.isDeleting;
        },

        setIsCourseLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isCourseLoading = action.payload.isLoading;
        },

        setIsCoursesLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isCoursesLoading = action.payload.isLoading;
        },

        setRefreshCourses: (state, action: PayloadAction<SetRefreshCoursesPayload>) => {
            state.refreshCourses = action.payload.refresh;
        },

        setSelectedCourse: (state, action: PayloadAction<CoursePayload>) => {
            state.selectedCourse = action.payload.course;
            state.isCourseLoading = false;
        },

        updateCourse: (state, action: PayloadAction<CoursePayload>) => {
            state.courses = filterCourses(state.courses.map(course =>
                (course.id === action.payload.course.id)
                    ? action.payload.course
                    : course
            ), state.courseFilter);
            state.courses = state.courses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            state.selectedCourse = (state.selectedCourse.id === action.payload.course.id)
                ? action.payload.course
                : state.selectedCourse;
            state.isCourseLoading = false;
        }
    }
});

export const {
    addCourse,
    addCourses,
    clearCourses,
    removeCourse,
    removeCourses,
    setCourseFilter,
    setCourses,
    setCoursesPagination,
    setCoursesScreenHistory,
    setHasMoreCourses,
    setIsCourseDeleting,
    setIsCourseLoading,
    setIsCoursesLoading,
    setRefreshCourses,
    setSelectedCourse,
    updateCourse
} = courseSlice.actions;

export default courseSlice.reducer;