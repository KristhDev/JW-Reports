import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    LessonPayload,
    Course,
    Lesson,
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

export const INIT_LESSON: Lesson = {
    id: '',
    course_id: '',
    description: '',
    next_lesson: new Date().toString(),
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
    courseFilter: 'all',
    courses: [],
    coursesPagination: {
        from: 0,
        to: 9
    },
    coursesScreenHistory: [],
    hasMoreCourses: true,
    hasMoreLessons: true,
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesLoading: false,
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lessons: [],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: INIT_COURSE,
    selectedLesson: INIT_LESSON,
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
            state.courseFilter = INITIAL_STATE.courseFilter;
            state.courses = INITIAL_STATE.courses;
            state.coursesPagination = INITIAL_STATE.coursesPagination;
            state.coursesScreenHistory = INITIAL_STATE.coursesScreenHistory;
            state.hasMoreCourses = INITIAL_STATE.hasMoreCourses;
            state.hasMoreLessons = INITIAL_STATE.hasMoreLessons;
            state.isCourseDeleting = INITIAL_STATE.isCourseDeleting;
            state.isCourseLoading = INITIAL_STATE.isCourseLoading;
            state.isCoursesLoading = INITIAL_STATE.isCoursesLoading;
            state.isLessonDeleting = INITIAL_STATE.isLessonDeleting;
            state.isLessonLoading = INITIAL_STATE.isLessonLoading;
            state.isLessonsLoading = INITIAL_STATE.isLessonsLoading;
            state.lessons = INITIAL_STATE.lessons;
            state.lessonsPagination = INITIAL_STATE.lessonsPagination;
            state.refreshCourses = INITIAL_STATE.refreshCourses;
            state.refreshLessons = INITIAL_STATE.refreshLessons;
            state.selectedCourse = INITIAL_STATE.selectedCourse;
            state.selectedLesson = INITIAL_STATE.selectedLesson;
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

        setIsLessonLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isLessonLoading = action.payload.isLoading;
        },

        setIsCoursesLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isCoursesLoading = action.payload.isLoading;
        },

        setRefreshCourses: (state, action: PayloadAction<SetRefreshCoursesPayload>) => {
            state.refreshCourses = action.payload.refresh;
        },

        setSelectedLesson: (state, action: PayloadAction<LessonPayload>) => {
            state.selectedLesson = action.payload.lesson;
            state.isLessonLoading = false;
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
    setIsLessonLoading,
    setIsCoursesLoading,
    setRefreshCourses,
    setSelectedCourse,
    setSelectedLesson,
    updateCourse
} = courseSlice.actions;

export default courseSlice.reducer;