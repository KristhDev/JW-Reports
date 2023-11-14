import { LoadResourcesOptions, Pagination } from './ui';

/**
 * This type is to define the structure that the course navigation will have.
 *
 * @property {undefined} CoursesTopTabsNavigation
 * @property {undefined} CourseDetailScreen
 * @property {undefined} AddOrEditCourseScreen
 * @property {undefined} AddOrEditLessonScreen
 * @property {undefined} LessonsScreen
 * @property {undefined} LessonDetailScreen
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
 * This type is to define the structure that the course navigation will have.
 *
 * @property {string} emptyMessage - The message to be displayed when there are no courses
 * @property {CourseFilter} filter - The filter for the courses
 * @property {string} title - The title of the screen
 */
export type CoursesTopTabsParams = {
    emptyMessage: string,
    filter: CourseFilter,
    title: string
}

/**
 * CoursesTopTabsParamsList is a type that has 4 properties, each of which is an object with 3
 * properties.
 *
 * @property {CoursesTopTabsParams} CoursesScreen
 * @property {CoursesTopTabsParams} ActiveCoursesScreen
 * @property {CoursesTopTabsParams} SuspendedCoursesScreen
 * @property {CoursesTopTabsParams} FinishedCoursesScreen
 */
export type CoursesTopTabsParamsList = {
    CoursesScreen: CoursesTopTabsParams,
    ActiveCoursesScreen: CoursesTopTabsParams,
    SuspendedCoursesScreen: CoursesTopTabsParams,
    FinishedCoursesScreen: CoursesTopTabsParams
}

/**
 * Defining the structure of the CoursesState object.
 *
 * @property {CourseFilter} courseFilter - The filter for the courses
 * @property {Course[]} courses - The courses to be displayed
 * @property {Pagination} coursesPagination - The pagination for the courses
 * @property {string[]} coursesScreenHistory - The history of the courses
 * @property {boolean} hasMoreCourses - Whether there are more courses to load
 * @property {boolean} hasMoreLessons - Whether there are more lessons to load
 * @property {boolean} isLessonDeleting - Whether a lesson is being deleted
 * @property {boolean} isCourseDeleting - Whether a course is being deleted
 * @property {boolean} isCourseLoading - Whether the courses are being loaded
 * @property {boolean} isCoursesLoading - Whether the courses are being loaded
 * @property {boolean} isLessonLoading - Whether the lessons are being loaded
 * @property {boolean} isLessonsLoading - Whether the lessons are being loaded
 * @property {LessonWithCourse} lastLesson - The last lesson of the course
 * @property {Lesson[]} lessons - The lessons to be displayed
 * @property {Pagination} lessonsPagination - The pagination for the lessons
 * @property {boolean} refreshCourses - Whether the courses should be refreshed
 * @property {boolean} refreshLessons - Whether the lessons should be refreshed
 * @property {Course} selectedCourse - The selected course
 * @property {Lesson} selectedLesson - The selected lesson
 */
export interface CoursesState {
    courseFilter: CourseFilter;
    courses: Course[];
    coursesPagination: Pagination;
    coursesScreenHistory: string[];
    hasMoreCourses: boolean;
    hasMoreLessons: boolean;
    isCourseDeleting: boolean;
    isCourseLoading: boolean;
    isCoursesLoading: boolean;
    isLastLessonLoading: boolean;
    isLessonDeleting: boolean;
    isLessonLoading: boolean;
    isLessonsLoading: boolean;
    lastLesson: LessonWithCourse;
    lessons: Lesson[];
    lessonsPagination: Pagination;
    refreshCourses: boolean;
    refreshLessons: boolean;
    selectedCourse: Course;
    selectedLesson: Lesson;
}

/**
 * Defining the structure of the Course object.
 *
 * @property {string} id - The id of the course
 * @property {string} userId - The id of the user
 * @property {string} personName - The name of the person
 * @property {string} personAbout - The about of the person
 * @property {string} personAddress - The address of the person
 * @property {string} publication - The publication of the course
 * @property {Lesson | undefined} lastLesson - The last lesson of the course
 * @property {boolean} suspended - Whether the course is suspended
 * @property {boolean} finished - Whether the course is finished
 * @property {string} createdAt - The created at of the course
 * @property {string} updatedAt - The updated at of the course
 */
export interface Course {
    id: string;
    userId: string;
    personName: string;
    personAbout: string;
    personAddress: string;
    publication: string;
    lastLesson?: Lesson;
    suspended: boolean;
    finished: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Defining the structure of the Course Endpoint object.
 *
 * @property {string} id - The id of the course
 * @property {string} user_id - The id of the user
 * @property {string} person_name - The name of the person
 * @property {string} person_about - The about of the person
 * @property {string} person_address - The address of the person
 * @property {string} publication - The publication of the course
 * @property {Lesson | undefined} last_lesson - The last lesson of the course
 * @property {boolean} suspended - Whether the course is suspended
 * @property {boolean} finished - Whether the course is finished
 * @property {string} created_at - The created at of the course
 * @property {string} updated_at - The updated at of the course
 */
export interface CourseEndpoint {
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

/**
 * Defining the structure of the Lesson object.
 *
 * @property {string} id - The id of the lesson
 * @property {string} courseId - The id of the course
 * @property {string} description - The description of the lesson
 * @property {string} nextLesson - The next lesson of the course
 * @property {boolean} done - Whether the lesson is done
 * @property {string} createdAt - The created at of the lesson
 * @property {string} updatedAt - The updated at of the lesson
 */
export interface Lesson {
    id: string;
    courseId: string;
    description: string;
    nextLesson: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Defining the structure of the Lesson Endpoint object.
 *
 * @property {string} id - The id of the lesson
 * @property {string} course_id - The id of the course
 * @property {string} description - The description of the lesson
 * @property {string} next_lesson - The next lesson of the course
 * @property {boolean} done - Whether the lesson is done
 * @property {string} created_at - The created at of the lesson
 * @property {string} updated_at - The updated at of the lesson
 */
export interface LessonEndpoint {
    id: string;
    course_id: string;
    description: string;
    next_lesson: string;
    done: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Defining the structure of the LessonWithCourse object.
 *
 * @property {Course} courses - The course of the lesson
 */
export interface LessonWithCourseEndpoint extends LessonEndpoint {
    courses: CourseEndpoint;
}

/**
 * Defining the structure of the LessonWithCourse object.
 *
 * @property {Course} course - The course of the lesson
 */
export interface LessonWithCourse extends Lesson {
    course: Course;
}

/**
 * Defining the structure of the CourseFormValues object.
 *
 * @property {string} personName - The name of the person
 * @property {string} personAbout - The about of the person
 * @property {string} personAddress - The address of the person
 * @property {string} publication - The publication of the course
 */
export interface CourseFormValues {
    personName: string;
    personAbout: string;
    personAddress: string;
    publication: string;
}

/**
 * Defining the structure of the LessonFormValues object.
 *
 * @property {string} description - The description of the lesson
 * @property {Date} next_lesson - The next lesson of the course
 */
export interface LessonFormValues {
    description: string;
    nextLesson: Date;
}

/* Extending the LoadResourcesOptions interface with a new property called filter. */
export interface loadCoursesOptions extends LoadResourcesOptions {
    filter: CourseFilter;
}

export type CourseFilter = 'all' | 'active' | 'suspended' | 'finished';

/**
 * LessonPayload is an object with a single property called lesson, which is of type Lesson.
 *
 * @property {Lesson} lesson - Lesson;
 */
export type LessonPayload = {
    lesson: Lesson;
}

/**
 * A CoursePayload is an object with a property called course that is of type Course.
 *
 * @property {Course} course - Course;
 */
export type CoursePayload = {
    course: Course;
}

/**
 * SetLessonWithCoursePayload is a type that has a property called lesson that is of type LessonWithCourse.
 *
 * @property {LessonWithCourse} lesson - LessonWithCourse
 */
export type SetLessonWithCoursePayload = {
    lesson: LessonWithCourse;
}

/**
 * SetCoursesPayload is a type that has a property called courses that is an array of Course types.
 *
 * @property {Course[]} courses - Course[] - an array of Course objects
 */
export type SetCoursesPayload = {
    courses: Course[];
}

/**
 * SetLessonsPayload is an object with a lessons property that is an array of Lesson objects.
 *
 * @property {Lesson[]} lessons - Lesson[]
 */
export type SetLessonsPayload = {
    lessons: Lesson[];
}