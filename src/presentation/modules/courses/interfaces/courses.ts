import { LoadResourcesOptions } from '@ui';

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

/* Extending the LoadResourcesOptions interface with a new property called filter. */
export interface loadCoursesOptions extends LoadResourcesOptions {
    filter: CourseFilter;
}

export type CourseFilter = 'all' | 'active' | 'suspended' | 'finished';
