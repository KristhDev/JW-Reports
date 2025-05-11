import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/* Entities */
import { LessonEntity } from '@domain/entities';

/* Interfaces */
import {
    HasMorePayload,
    PaginationPayload,
    RefreshPayload,
    RemoveResourcePayload,
    SetIsDeletingPayload,
    SetIsLoadingPayload,
} from '../types';

import { LessonPayload, LessonsState, SetLessonsPayload, SetLessonWithCoursePayload } from './types';
import { INIT_COURSE } from '../courses';

import { SorterUtil } from '@utils';

/* Initial lesson */
export const INIT_LESSON: LessonEntity = {
    id: '',
    courseId: '',
    description: '',
    nextLesson: new Date().toISOString(),
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}

/* Initial state */
export const LESSONS_INITIAL_STATE: LessonsState = {
    hasMoreLessons: true,
    isLastLessonLoading: false,
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lastLesson: {
        ...INIT_LESSON,
        course: INIT_COURSE
    },
    lessons: [],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshLessons: false,
    selectedLesson: INIT_LESSON,
}

/* Slice of management state */
const lessonsSlice = createSlice({
    name: 'lessons',
    initialState: LESSONS_INITIAL_STATE,
    reducers: {
        addLesson: (state, action: PayloadAction<LessonPayload>) => {
            const lessonsArr = new Set([ action.payload.lesson, ...state.lessons ]);
            const sortedLessons = SorterUtil.sortLessonsByNextLesson([ ...lessonsArr ])

            state.lessons = sortedLessons;
        },

        addLessons: (state, action: PayloadAction<SetLessonsPayload>) => {
            state.lessons = [ ...state.lessons, ...action.payload.lessons ];
        },

        clearLessons: (state) => {
            state.hasMoreLessons = LESSONS_INITIAL_STATE.hasMoreLessons;
            state.isLessonDeleting = LESSONS_INITIAL_STATE.isLessonDeleting;
            state.isLessonLoading = LESSONS_INITIAL_STATE.isLessonLoading;
            state.isLessonsLoading = LESSONS_INITIAL_STATE.isLessonsLoading;
            state.lessons = LESSONS_INITIAL_STATE.lessons;
            state.lessonsPagination = LESSONS_INITIAL_STATE.lessonsPagination;
            state.refreshLessons = LESSONS_INITIAL_STATE.refreshLessons;
            state.selectedLesson = LESSONS_INITIAL_STATE.selectedLesson;
        },

        removeLesson: (state, action: PayloadAction<RemoveResourcePayload>) => {
            state.lessons = state.lessons.filter(l => l.id !== action.payload.id);
        },

        removeLessons: (state) => {
            state.lessons = [];
        },

        setLastLesson: (state, action: PayloadAction<SetLessonWithCoursePayload>) => {
            state.lastLesson = action.payload.lesson;
        },

        setLessons: (state, action: PayloadAction<SetLessonsPayload>) => {
            state.lessons = [ ...action.payload.lessons ];
        },

        setHasMoreLessons: (state, action: PayloadAction<HasMorePayload>) => {
            state.hasMoreLessons = action.payload.hasMore;
        },

        setIsLessonDeleting: (state, action: PayloadAction<SetIsDeletingPayload>) => {
            state.isLessonDeleting = action.payload.isDeleting;
        },

        setIsLastLessonLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isLastLessonLoading = action.payload.isLoading;
        },

        setIsLessonLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isLessonLoading = action.payload.isLoading;
        },

        setIsLessonsLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isLessonsLoading = action.payload.isLoading;
        },

        setLessonsPagination: (state, action: PayloadAction<PaginationPayload>) => {
            state.lessonsPagination = action.payload.pagination;
        },

        setRefreshLessons: (state, action: PayloadAction<RefreshPayload>) => {
            state.refreshLessons = action.payload.refresh;
        },

        setSelectedLesson: (state, action: PayloadAction<LessonPayload>) => {
            state.selectedLesson = action.payload.lesson;
        },

        updateLesson: (state, action: PayloadAction<LessonPayload>) => {
            const updatedLessons = state.lessons.map(
                lesson => (lesson.id === action.payload.lesson.id)
                    ? action.payload.lesson
                    : lesson
            );

            const sortedLessons = SorterUtil.sortLessonsByNextLesson(updatedLessons);
            state.lessons = sortedLessons;
        }
    }
});

export const {
    addLesson,
    addLessons,
    clearLessons,
    removeLesson,
    removeLessons,
    setHasMoreLessons,
    setIsLastLessonLoading,
    setIsLessonDeleting,
    setIsLessonLoading,
    setIsLessonsLoading,
    setLastLesson,
    setLessons,
    setLessonsPagination,
    setRefreshLessons,
    setSelectedLesson,
    updateLesson
} = lessonsSlice.actions;

export default lessonsSlice.reducer;