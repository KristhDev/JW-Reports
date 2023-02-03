import { LoadResourcesOptions, Pagination } from './ui';

/**
 * This type is to define the structure that the course navigation will have.
 * @property CoursesTopTabsNavigation - undefined;
 * @property CourseDetailScreen - undefined;
 * @property AddOrEditCourseScreen - undefined;
 * @property AddOrEditLessonScreen - undefined;
 * @property LessonsScreen - undefined;
 * @property LessonDetailScreen - undefined;
 */
export type CoursesStackParamsList = {
    CoursesTopTabsNavigation: undefined;
    CourseDetailScreen: undefined;
    AddOrEditCourseScreen: undefined;
    AddOrEditLessonScreen: undefined;
    LessonsScreen: undefined;
    LessonDetailScreen: undefined;
}

/**
 * CoursesTopTabsParamsList is a type that has 4 properties, each of which is an object with 3
 * properties.
 * @property CoursesScreen
 * @property ActiveCoursesScreen
 * @property SuspendedCoursesScreen
 * @property FinishedCoursesScreen
 */
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

/* Defining the structure of the CoursesState object. */
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

/* Defining the structure of the Course object. */
export interface Course {
    id: string;
    user_id: string;
    person_name: string;
    person_about: string;
    person_address: string;
    publication: string;
    last_lesson?: Lesson;
    suspended: boolean;
    finished: boolean;
    created_at: string;
    updated_at: string;
}

/* Defining the structure of the Lesson object. */
export interface Lesson {
    id: string;
    course_id: string;
    description: string;
    next_lesson: string;
    done: boolean;
    created_at: string;
    updated_at: string;
}

/* Defining the structure of the CourseFormValues object. */
export interface CourseFormValues {
    person_name: string;
    person_about: string;
    person_address: string;
    publication: string;
}

/* Defining the structure of the LessonFormValues object. */
export interface LessonFormValues {
    description: string;
    next_lesson: Date;
}

/* Extending the LoadResourcesOptions interface with a new property called filter. */
export interface loadCoursesOptions extends LoadResourcesOptions {
    filter: CourseFilter;
}

export type CourseFilter = 'all' | 'active' | 'suspended' | 'finished';

/**
 * LessonPayload is an object with a single property called lesson, which is of type Lesson.
 * @property {Lesson} lesson - Lesson;
 */
export type LessonPayload = {
    lesson: Lesson;
}

/**
 * A CoursePayload is an object with a property called course that is of type Course.
 * @property {Course} course - Course;
 */
export type CoursePayload = {
    course: Course;
}

/**
 * SetCoursesPayload is a type that has a property called courses that is an array of Course types.
 * @property {Course[]} courses - Course[] - an array of Course objects
 */
export type SetCoursesPayload = {
    courses: Course[];
}

/**
 * SetLessonsPayload is an object with a lessons property that is an array of Lesson objects.
 * @property {Lesson[]} lessons - Lesson[]
 */
export type SetLessonsPayload = {
    lessons: Lesson[];
}