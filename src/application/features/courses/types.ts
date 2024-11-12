/* Entities */
import { CourseEntity, LessonEntity } from '@domain/entities';

/* Types */
import { CourseFilter } from 'src/presentation/modules/courses';
import { Pagination } from '../ui/types';

/**
 * Defining the structure of the CoursesState object.
 *
 * @property {CourseFilter} courseFilter - The filter for the courses
 * @property {CourseEntity[]} courses - The courses to be displayed
 * @property {Pagination} coursesPagination - The pagination for the courses
 * @property {string[]} coursesScreenHistory - The history of the courses
 * @property {boolean} hasMoreCourses - Whether there are more courses to load
 * @property {boolean} isCourseDeleting - Whether a course is being deleted
 * @property {boolean} isCourseLoading - Whether the courses are being loaded
 * @property {boolean} isCoursesExporting - Whether the courses are being exported
 * @property {boolean} isCoursesLoading - Whether the courses are being loaded
 * @property {boolean} refreshCourses - Whether the courses should be refreshed
 * @property {CourseEntity} selectedCourse - The selected course
 */
export interface CoursesState {
    courseFilter: CourseFilter;
    courses: CourseEntity[];
    coursesPagination: Pagination;
    coursesScreenHistory: string[];
    hasMoreCourses: boolean;
    isCourseDeleting: boolean;
    isCourseLoading: boolean;
    isCoursesExporting: boolean;
    isCoursesLoading: boolean;
    refreshCourses: boolean;
    selectedCourse: CourseEntity;
}

/**
 * A CoursePayload is an object with a property called course that is of type CourseEntity.
 *
 * @property {CourseEntity} course - CourseEntity;
 */
export type CoursePayload = {
    course: CourseEntity;
}

/**
 * SetCoursesPayload is a type that has a property called courses that is an array of CourseEntity types.
 *
 * @property {CourseEntity[]} courses - CourseEntity[] - an array of CourseEntity objects
 */
export type SetCoursesPayload = {
    courses: CourseEntity[];
}

/**
 * AddLastLessonInCoursePayload is a type that has a property called courseId that is of type string
 * and a property called lastLesson that is of type LessonEntity.
 *
 * @property {string} courseId - The id of the course
 * @property {LessonEntity} lastLesson - The last lesson of the course
 */
export type AddLastLessonInCoursePayload = {
    courseId: string;
    lastLesson: LessonEntity;
}

/**
 * ReplaceLastLessonInCoursePayload is a type that has a property called lessonId that is of type string
 * and a property called lastLesson that is of type LessonEntity.
 *
 * @property {string} lessonId - The id of the lesson
 * @property {LessonEntity} lastLesson - The last lesson of the course
 */
export type ReplaceLastLessonInCoursePayload = {
    lessonId: string;
    lastLesson: LessonEntity;
}