import { Course, CourseEndpoint } from '@courses';
import { Pagination } from '@ui';

/**
 * Defining the structure of the LessonsState object.
 *
 * @property {boolean} hasMoreLessons - Whether there are more lessons to load
 * @property {boolean} isLastLessonLoading - Whether the last lesson is being loaded
 * @property {boolean} isLessonDeleting - Whether a lesson is being deleted
 * @property {boolean} isLessonLoading - Whether the lessons are being loaded
 * @property {boolean} isLessonsLoading - Whether the lessons are being loaded
 * @property {LessonWithCourse} lastLesson - The last lesson of the course
 * @property {Lesson[]} lessons - The lessons to be displayed
 * @property {Pagination} lessonsPagination - The pagination for the lessons
 * @property {boolean} refreshLessons - Whether the lessons should be refreshed
 * @property {Lesson} selectedLesson - The selected lesson
 */
export interface LessonsState {
    hasMoreLessons: boolean;
    isLastLessonLoading: boolean;
    isLessonDeleting: boolean;
    isLessonLoading: boolean;
    isLessonsLoading: boolean;
    lastLesson: LessonWithCourse;
    lessons: Lesson[];
    lessonsPagination: Pagination;
    refreshLessons: boolean;
    selectedLesson: Lesson;
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
 * Defining the structure of the LessonFormValues object.
 *
 * @property {string} description - The description of the lesson
 * @property {Date} next_lesson - The next lesson of the course
 */
export interface LessonFormValues {
    description: string;
    nextLesson: Date;
}

/**
 * LessonPayload is an object with a single property called lesson, which is of type Lesson.
 *
 * @property {Lesson} lesson - Lesson;
 */
export type LessonPayload = {
    lesson: Lesson;
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
 * SetLessonsPayload is an object with a lessons property that is an array of Lesson objects.
 *
 * @property {Lesson[]} lessons - Lesson[]
 */
export type SetLessonsPayload = {
    lessons: Lesson[];
}