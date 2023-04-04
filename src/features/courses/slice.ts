import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/* Interfaces */
import {
    Course,
    CourseFilter,
    CoursePayload,
    CoursesState,
    Lesson,
    LessonPayload,
    SetCoursesPayload,
    SetLessonsPayload,
} from '../../interfaces/courses';

import {
    HasMorePayload,
    HistoryPayload,
    PaginationPayload,
    RefreshPayload,
    RemoveResourcePayload,
    SetIsDeletingPayload,
    SetIsLoadingPayload
} from '../../interfaces/features';

/* Initial lesson */
export const INIT_LESSON: Lesson = {
    id: '',
    course_id: '',
    description: '',
    next_lesson: new Date().toString(),
    done: false,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
}

/* Initial course */
export const INIT_COURSE: Course = {
    id: '',
    user_id: '',
    person_name: '',
    person_about: '',
    person_address: '',
    publication: '',
    last_lesson: undefined,
    suspended: false,
    finished: false,
    created_at: new Date().toString(),
    updated_at: new Date().toString()
}

/* Initial state */
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

/**
 * It takes a list of courses and a filter, and returns a filtered list of courses
 * @param {Course[]} courses - Course[]
 * @param {CourseFilter} filter - CourseFilter = 'active' | 'all' | 'finished' | 'suspended'
 * @returns A function that returns the filtered courses.
 */
const filterCoursesBy = (courses: Course[], filter: CourseFilter) => {
    const coursesFiltereds = {
        active: () => courses.filter(c => !c.suspended && !c.finished),
        all: () => courses,
        finished: () => courses.filter(c => !c.suspended && c.finished),
        suspended: () => courses.filter(c => c.suspended && !c.finished)
    }

    return coursesFiltereds[filter]();
}

/* Slice of management state */
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

        addLesson: (state, action: PayloadAction<LessonPayload>) => {
            const lessonsArr = new Set([ action.payload.lesson, ...state.lessons ]);

            state.lessons = [ ...lessonsArr ];
            state.lessons = state.lessons.sort((a, b) => new Date(b.next_lesson).getTime() - new Date(a.next_lesson).getTime());
            state.isLessonLoading = false;

            state.courses = state.courses.map(c =>
                (c.id === action.payload.lesson.course_id)
                    ? { ...c, last_lesson: state.lessons[0] }
                    : c
            );

            state.selectedCourse = (state.selectedCourse.id === action.payload.lesson.course_id)
                ? { ...state.selectedCourse, last_lesson: state.lessons[0] }
                : state.selectedCourse;
        },

        addLessons: (state, action: PayloadAction<SetLessonsPayload>) => {
            state.lessons = [ ...state.lessons, ...action.payload.lessons ];
            state.isLessonsLoading = false;
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

        removeLesson: (state, action: PayloadAction<RemoveResourcePayload>) => {
            state.lessons = state.lessons.filter(l => l.id !== action.payload.id);

            state.courses = state.courses.map(c =>
                (c.last_lesson && c.last_lesson.id === action.payload.id)
                ? { ...c, last_lesson: state.lessons[0] }
                : c
            );

            state.selectedCourse = (state.selectedCourse.last_lesson && state.selectedCourse.last_lesson.id === action.payload.id)
                ? { ...state.selectedCourse, last_lesson: state.lessons[0] }
                : state.selectedCourse;

            state.isLessonDeleting = false;
        },

        removeLessons: (state) => {
            state.lessons = [];
        },

        setCourseFilter: (state, action: PayloadAction<{ filter: CourseFilter }>) => {
            state.courseFilter = action.payload.filter;
        },

        setCourses: (state, action: PayloadAction<SetCoursesPayload>) => {
            state.courses = [ ...action.payload.courses ];
            state.isCoursesLoading = false;
        },

        setLessons: (state, action: PayloadAction<SetLessonsPayload>) => {
            state.lessons = [ ...action.payload.lessons ];
            state.isLessonsLoading = false;

            state.courses = state.courses.map(c =>
                (state.lessons.length > 0 && c.id === state.lessons[0].course_id && (!c.last_lesson || c.last_lesson.id !== state.lessons[0].id))
                    ? { ...c, last_lesson: state.lessons[0] }
                    : c
            );

            state.selectedCourse =
                (state.lessons.length > 0 && state.selectedCourse.id === state.lessons[0].course_id
                    && (!state.selectedCourse.last_lesson || state.selectedCourse.last_lesson.id !== state.lessons[0].id)
                )
                    ? { ...state.selectedCourse, last_lesson: state.lessons[0] }
                    : state.selectedCourse;
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

        setHasMoreLessons: (state, action: PayloadAction<HasMorePayload>) => {
            state.hasMoreLessons = action.payload.hasMore;
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

        setIsLessonDeleting: (state, action: PayloadAction<SetIsDeletingPayload>) => {
            state.isLessonDeleting = action.payload.isDeleting;
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

        setRefreshCourses: (state, action: PayloadAction<RefreshPayload>) => {
            state.refreshCourses = action.payload.refresh;
        },

        setRefreshLessons: (state, action: PayloadAction<RefreshPayload>) => {
            state.refreshLessons = action.payload.refresh;
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
            state.courses = filterCoursesBy(state.courses.map(course =>
                (course.id === action.payload.course.id)
                    ? action.payload.course
                    : course
            ), state.courseFilter);

            state.courses = state.courses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            state.selectedCourse = (state.selectedCourse.id === action.payload.course.id)
                ? action.payload.course
                : state.selectedCourse;

            state.isCourseLoading = false;
        },

        updateLesson: (state, action: PayloadAction<LessonPayload>) => {
            state.lessons = state.lessons.map(lesson =>
                (lesson.id === action.payload.lesson.id)
                    ? action.payload.lesson
                    : lesson
            );

            state.lessons = state.lessons.sort((a, b) => new Date(b.next_lesson).getTime() - new Date(a.next_lesson).getTime());

            state.selectedLesson = (state.selectedLesson.id === action.payload.lesson.id)
                ? action.payload.lesson
                : state.selectedLesson;

            state.courses = state.courses.map(c =>
                (c.last_lesson && c.id === action.payload.lesson.course_id)
                    ? { ...c, last_lesson: state.lessons[0] }
                    : c
            );

            state.selectedCourse = (state.selectedCourse.last_lesson && state.selectedCourse.id === action.payload.lesson.course_id)
                ? { ...state.selectedCourse, last_lesson: state.lessons[0] }
                : state.selectedCourse;

            state.isLessonLoading = false;
        }
    }
});

export const {
    addCourse,
    addCourses,
    addLesson,
    addLessons,
    clearCourses,
    removeCourse,
    removeCourses,
    removeLesson,
    removeLessons,
    setCourseFilter,
    setCourses,
    setCoursesPagination,
    setCoursesScreenHistory,
    setHasMoreCourses,
    setHasMoreLessons,
    setIsCourseDeleting,
    setIsCourseLoading,
    setIsCoursesLoading,
    setIsLessonDeleting,
    setIsLessonLoading,
    setIsLessonsLoading,
    setLessons,
    setLessonsPagination,
    setRefreshCourses,
    setRefreshLessons,
    setSelectedCourse,
    setSelectedLesson,
    updateCourse,
    updateLesson
} = courseSlice.actions;

export default courseSlice.reducer;