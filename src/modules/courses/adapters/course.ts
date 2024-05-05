import { Course, CourseEndpoint, CourseFormValues } from '../interfaces';
import { lessonAdapter } from './lesson';

/**
 * Adapts a CourseEndpoint object to a Course object.
 *
 * @param {CourseEndpoint} course - The CourseEndpoint object to be adapted.
 * @return {Course} The adapted Course object.
 */
export const courseAdapter = (course: CourseEndpoint): Course => ({
    id: course.id,
    userId: course.user_id,
    personName: course.person_name,
    personAbout: course.person_about,
    personAddress: course.person_address,
    publication: course.publication,
    lastLesson: course.last_lesson ? lessonAdapter(course?.last_lesson) : undefined,
    suspended: course.suspended,
    finished: course.finished,
    createdAt: course.created_at,
    updatedAt: course.updated_at
});

/**
 * Converts the given course object to a new object with modified property names.
 *
 * @param {CourseFormValues} course - The course object to be converted.
 * @return {Object} - The converted course object with modified property names.
 */
export const courseFormValuesAdapter = (course: CourseFormValues) => ({
    person_name: course.personName,
    person_about: course.personAbout,
    person_address: course.personAddress,
    publication: course.publication
});