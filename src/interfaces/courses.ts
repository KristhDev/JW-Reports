import { Pagination } from './ui';

export type CoursesStackParamsList = {
    CoursesTopTabsNavigation: undefined;
    CourseDetailScreen: undefined;
    AddOrEditCourseScreen: undefined;
    AddOrEditLessonScreen: undefined;
}

export type CoursesTopTabsParamsList = {
    CoursesScreen: {
        emptyMessage: string,
        filter: CourseFilter,
        title: string
    },
    ActiveCoursesScreen: {
        emptyMessage: string,
        filter: CourseFilter,
        title: string
    },
    SuspendedCoursesScreen: {
        emptyMessage: string,
        filter: CourseFilter,
        title: string
    },
    FinishedCoursesScreen: {
        emptyMessage: string,
        filter: CourseFilter,
        title: string
    }
}

export interface CoursesState {
    courseFilter: CourseFilter;
    courses: Course[];
    coursesPagination: Pagination;
    coursesScreenHistory: string[];
    hasMoreCourses: boolean;
    hasMoreLessons: boolean;
    isLessonDeleting: boolean;
    isCourseDeleting: boolean;
    isCourseLoading: boolean;
    isCoursesLoading: boolean;
    isLessonLoading: boolean;
    isLessonsLoading: boolean;
    lessons: Lesson[];
    lessonsPagination: Pagination;
    refreshCourses: boolean;
    refreshLessons: boolean;
    selectedCourse: Course;
    selectedLesson: Lesson;
}

export interface Course {
    id: string;
    user_id: string;
    person_name: string;
    person_about: string;
    person_address: string;
    publication: string;
    suspended: boolean;
    finished: boolean;
    created_at: string;
    updated_at: string;
}

export interface Lesson {
    id: string;
    course_id: string;
    description: string;
    next_class: string;
    done: boolean;
    created_at: string;
    updated_at: string;
}

export type CourseFilter = 'all' | 'active' | 'suspended' | 'finished';

export type LessonPayload = {
    lesson: Lesson;
}

export type CoursePayload = {
    course: Course;
}

export type SetHasMoreCoursesPayload = {
    hasMore: boolean;
}

export type SetRefreshCoursesPayload = {
    refresh: boolean;
}

export type SetCoursesPayload = {
    courses: Course[];
}

export type SetCoursesHistoryPayload = {
    newScreen: string;
}

export type SetCoursesPaginationPayload = {
    pagination: Pagination;
}