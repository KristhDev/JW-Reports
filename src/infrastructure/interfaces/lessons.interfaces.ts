import { string } from 'yup';
import { CourseEndpoint } from './courses.interfaces';

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

export interface LessonsMessages {
    ADDED_SUCCESS: string;
    DELETED_SUCCESS: string;
    DESCRIPTION_MIN_LENGTH: string;
    DESCRIPTION_REQUIRED: string;
    FINISHED_SUCCESS: string;
    NEXT_LESSON_REQUIRED: string;
    REPROGRAMMED_SUCCESS: string;
    SUSPENDED_OR_FINISHED: string;
    UNSELECTED_DELETE: string;
    UNSELECTED_UPDATE: string;
    UNSELECTED: string;
    UPDATED_SUCCESS: string;
}

export interface LessonsPlaceholders {
    SELECT_DAY: string;
}