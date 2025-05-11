import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/* Entities */
import { CourseEntity } from '@domain/entities';

/* Interfaces */
import {
    HasMorePayload,
    HistoryPayload,
    PaginationPayload,
    RefreshPayload,
    RemoveResourcePayload,
    SetIsDeletingPayload,
    SetIsExportingPayload,
    SetIsLoadingPayload,
} from '../types';

import {
    AddLastLessonInCoursePayload,
    CoursePayload,
    CoursesState,
    ReplaceLastLessonInCoursePayload,
    SetCoursesPayload,
} from './types';

import { CourseFilter } from '@courses/interfaces';
import { LessonPayload } from '../lessons/types';

import { FilterUtil, SorterUtil } from '@utils';

/* Initial course */
export const INIT_COURSE: CourseEntity = {
    id: '',
    userId: '',
    personName: '',
    personAbout: '',
    personAddress: '',
    publication: '',
    lastLesson: undefined,
    suspended: false,
    finished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}

/* Initial state */
export const COURSES_INITIAL_STATE: CoursesState = {
    courseFilter: 'all',
    courses: [],
    coursesPagination: {
        from: 0,
        to: 9
    },
    coursesScreenHistory: [],
    hasMoreCourses: true,
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesExporting: false,
    isCoursesLoading: false,
    refreshCourses: false,
    selectedCourse: INIT_COURSE,
}

/* Slice of management state */
const courseSlice = createSlice({
    name: 'courses',
    initialState: COURSES_INITIAL_STATE,
    reducers: {
        addCourse: (state, action: PayloadAction<CoursePayload>) => {
            const sortedCourses = SorterUtil.sortCoursesByCreatedAt([ action.payload.course, ...state.courses ])
            state.courses = sortedCourses;
        },

        addCourses: (state, action: PayloadAction<SetCoursesPayload>) => {
            state.courses = [ ...state.courses, ...action.payload.courses ];
        },

        addLastLessonInCourse: (state, action: PayloadAction<AddLastLessonInCoursePayload>) => {
            state.courses = state.courses.map(c =>
                (c.id === action.payload.courseId)
                    ? { ...c, lastLesson: action.payload.lastLesson }
                    : c
            );

            state.selectedCourse = (state.selectedCourse.id === action.payload.courseId)
                ? { ...state.selectedCourse, lastLesson: action.payload.lastLesson }
                : state.selectedCourse;
        },

        clearCourses: (state) => {
            state.courseFilter = COURSES_INITIAL_STATE.courseFilter;
            state.courses = COURSES_INITIAL_STATE.courses;
            state.coursesPagination = COURSES_INITIAL_STATE.coursesPagination;
            state.coursesScreenHistory = COURSES_INITIAL_STATE.coursesScreenHistory;
            state.hasMoreCourses = COURSES_INITIAL_STATE.hasMoreCourses;
            state.isCourseDeleting = COURSES_INITIAL_STATE.isCourseDeleting;
            state.isCourseLoading = COURSES_INITIAL_STATE.isCourseLoading;
            state.isCoursesLoading = COURSES_INITIAL_STATE.isCoursesLoading;
            state.refreshCourses = COURSES_INITIAL_STATE.refreshCourses;
            state.selectedCourse = COURSES_INITIAL_STATE.selectedCourse;
        },

        replaceLastLessonInCourse: (state, action: PayloadAction<ReplaceLastLessonInCoursePayload>) => {
            state.courses = state.courses.map(c =>
                (c.lastLesson && c.lastLesson.id === action.payload.lessonId)
                ? { ...c, lastLesson: action.payload.lastLesson }
                : c
            );

            state.selectedCourse = (state.selectedCourse.lastLesson && state.selectedCourse.lastLesson.id === action.payload.lessonId)
                ? { ...state.selectedCourse, lastLesson: action.payload.lastLesson }
                : state.selectedCourse;
        },

        removeCourse: (state, action: PayloadAction<RemoveResourcePayload>) => {
            state.courses = state.courses.filter(r => r.id !== action.payload.id);
        },

        removeCourses: (state) => {
            state.courses = [];
        },

        setCourseFilter: (state, action: PayloadAction<{ filter: CourseFilter }>) => {
            state.courseFilter = action.payload.filter;
        },

        setCourses: (state, action: PayloadAction<SetCoursesPayload>) => {
            state.courses = [ ...action.payload.courses ];
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

        setIsCoursesExporting: (state, action: PayloadAction<SetIsExportingPayload>) => {
            state.isCoursesExporting = action.payload.isExporting;
        },

        setIsCoursesLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isCoursesLoading = action.payload.isLoading;
        },

        setRefreshCourses: (state, action: PayloadAction<RefreshPayload>) => {
            state.refreshCourses = action.payload.refresh;
        },

        setSelectedCourse: (state, action: PayloadAction<CoursePayload>) => {
            state.selectedCourse = action.payload.course;
        },

        updateCourse: (state, action: PayloadAction<CoursePayload>) => {
            const updatedCourses = state.courses.map(course =>
                (course.id === action.payload.course.id)
                    ? { ...action.payload.course, lastLesson: course.lastLesson }
                    : course
            );

            const filteredCourses = FilterUtil.filterCoursesBy(updatedCourses, state.courseFilter);
            const sortedCourses = SorterUtil.sortCoursesByCreatedAt(filteredCourses);

            state.courses = sortedCourses;
        },

        updateLastLessonInCourse: (state, action: PayloadAction<LessonPayload>) => {
            state.courses = state.courses.map(c =>
                (c.lastLesson && c.id === action.payload.lesson.courseId)
                    ? { ...c, lastLesson: action.payload.lesson }
                    : c
            );

            state.selectedCourse = (state.selectedCourse.lastLesson && state.selectedCourse.id === action.payload.lesson.courseId)
                ? { ...state.selectedCourse, lastLesson: action.payload.lesson }
                : state.selectedCourse;
        }
    }
});

export const {
    addCourse,
    addCourses,
    addLastLessonInCourse,
    clearCourses,
    removeCourse,
    removeCourses,
    replaceLastLessonInCourse,
    setCourseFilter,
    setCourses,
    setCoursesPagination,
    setCoursesScreenHistory,
    setHasMoreCourses,
    setIsCourseDeleting,
    setIsCourseLoading,
    setIsCoursesExporting,
    setIsCoursesLoading,
    setRefreshCourses,
    setSelectedCourse,
    updateCourse,
    updateLastLessonInCourse
} = courseSlice.actions;

export default courseSlice.reducer;