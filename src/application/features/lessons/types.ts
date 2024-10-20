import { LessonEntity, LessonWithCourseEntity } from '@domain/entities';
import { Pagination } from '../ui/types';

/**
 * Defining the structure of the LessonsState object.
 *
 * @property {boolean} hasMoreLessons - Whether there are more lessons to load
 * @property {boolean} isLastLessonLoading - Whether the last lesson is being loaded
 * @property {boolean} isLessonDeleting - Whether a lesson is being deleted
 * @property {boolean} isLessonLoading - Whether the lessons are being loaded
 * @property {boolean} isLessonsLoading - Whether the lessons are being loaded
 * @property {LessonWithCourseEntity} lastLesson - The last lesson of the course
 * @property {LessonEntity[]} lessons - The lessons to be displayed
 * @property {Pagination} lessonsPagination - The pagination for the lessons
 * @property {boolean} refreshLessons - Whether the lessons should be refreshed
 * @property {LessonEntity} selectedLesson - The selected lesson
 */
export interface LessonsState {
    hasMoreLessons: boolean;
    isLastLessonLoading: boolean;
    isLessonDeleting: boolean;
    isLessonLoading: boolean;
    isLessonsLoading: boolean;
    lastLesson: LessonWithCourseEntity;
    lessons: LessonEntity[];
    lessonsPagination: Pagination;
    refreshLessons: boolean;
    selectedLesson: LessonEntity;
}

/**
 * LessonPayload is an object with a single property called lesson, which is of type LessonEntity.
 *
 * @property {LessonEntity} lesson - LessonEntity;
 */
export type LessonPayload = {
    lesson: LessonEntity;
}

/**
 * SetLessonWithCoursePayload is a type that has a property called lesson that is of type LessonWithCourseEntity.
 *
 * @property {LessonWithCourseEntity} lesson - LessonWithCourseEntity
 */
export type SetLessonWithCoursePayload = {
    lesson: LessonWithCourseEntity;
}

/**
 * SetLessonsPayload is an object with a lessons property that is an array of LessonEntity objects.
 *
 * @property {LessonEntity[]} lessons - LessonEntity[]
 */
export type SetLessonsPayload = {
    lessons: LessonEntity[];
}
