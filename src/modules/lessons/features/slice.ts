import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/* Interfaces */
import {
    HasMorePayload,
    PaginationPayload,
    RefreshPayload,
    RemoveResourcePayload,
    SetIsDeletingPayload,
    SetIsLoadingPayload,
} from '@shared';

import { Lesson, LessonPayload, LessonsState, SetLessonsPayload, SetLessonWithCoursePayload } from '../interfaces';

/* Courses */
import { INIT_COURSE } from '@courses';

/* Initial lesson */
export const INIT_LESSON: Lesson = {
    id: '',
    courseId: '',
    description: '',
    nextLesson: new Date().toString(),
    done: false,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
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

            state.lessons = [ ...lessonsArr ];
            state.lessons = state.lessons.sort((a, b) => new Date(b.nextLesson).getTime() - new Date(a.nextLesson).getTime());
            state.isLessonLoading = false;
        },

        addLastLesson: (state, action: PayloadAction<SetLessonWithCoursePayload>) => {
            state.lastLesson = action.payload.lesson;
            state.isLastLessonLoading = false;
        },

        addLessons: (state, action: PayloadAction<SetLessonsPayload>) => {
            state.lessons = [ ...state.lessons, ...action.payload.lessons ];
            state.isLessonsLoading = false;
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
            state.isLessonDeleting = false;
        },

        removeLessons: (state) => {
            state.lessons = [];
        },

        setLessons: (state, action: PayloadAction<SetLessonsPayload>) => {
            state.lessons = [ ...action.payload.lessons ];
            state.isLessonsLoading = false;
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
            state.isLessonLoading = false;
        },

        updateLesson: (state, action: PayloadAction<LessonPayload>) => {
            state.lessons = state.lessons.map(lesson =>
                (lesson.id === action.payload.lesson.id)
                    ? action.payload.lesson
                    : lesson
            );

            state.lessons = state.lessons.sort((a, b) => new Date(b.nextLesson).getTime() - new Date(a.nextLesson).getTime());

            state.selectedLesson = (state.selectedLesson.id === action.payload.lesson.id)
                ? action.payload.lesson
                : state.selectedLesson;

            state.lastLesson = (state.lastLesson.id === action.payload.lesson.id)
                ? { ...action.payload.lesson, course: state.lastLesson.course }
                : state.lastLesson;
        }
    }
});

export const {
    addLastLesson,
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
    setLessons,
    setLessonsPagination,
    setRefreshLessons,
    setSelectedLesson,
    updateLesson
} = lessonsSlice.actions;

export default lessonsSlice.reducer;