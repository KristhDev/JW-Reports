import { LessonEndpoint } from './lessons.interfaces';

/**
 * Defining the structure of the Course Endpoint object.
 *
 * @property {string} id - The id of the course
 * @property {string} user_id - The id of the user
 * @property {string} person_name - The name of the person
 * @property {string} person_about - The about of the person
 * @property {string} person_address - The address of the person
 * @property {string} publication - The publication of the course
 * @property {LessonEndpoint[] | undefined} lessons - The lessons of the course
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
    lessons?: LessonEndpoint[];
    suspended: boolean;
    finished: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Defining the structure of the Course With Lessons Endpoint object.
 *
 * @property {string} id - The id of the course
 * @property {string} user_id - The id of the user
 * @property {string} person_name - The name of the person
 * @property {string} person_about - The about of the person
 * @property {string} person_address - The address of the person
 * @property {string} publication - The publication of the course
 * @property {LessonEndpoint[] | undefined} lessons - The lessons of the course
 * @property {boolean} suspended - Whether the course is suspended
 * @property {boolean} finished - Whether the course is finished
 * @property {string} created_at - The created at of the course
 * @property {string} updated_at - The updated at of the course
 */
export interface CourseWithLessonsEndpoint {
    id: string;
    user_id: string;
    person_name: string;
    person_about: string;
    person_address: string;
    publication: string;
    lessons: LessonEndpoint[];
    suspended: boolean;
    finished: boolean;
    created_at: string;
    updated_at: string;
}