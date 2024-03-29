import { Course, CourseEndpoint, CourseFormValues, Lesson, LessonEndpoint } from '../interfaces';

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
    lastLesson: course.last_lesson,
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

/**
 * Converts a LessonEndpoint object to a Lesson object.
 *
 * @param {LessonEndpoint} lesson - The LessonEndpoint object to be converted.
 * @return {Lesson} The converted Lesson object.
 */
export const lessonAdapter = (lesson: LessonEndpoint): Lesson => ({
    id: lesson.id,
    courseId: lesson.course_id,
    description: lesson.description,
    nextLesson: lesson.next_lesson,
    done: lesson.done,
    createdAt: lesson.created_at,
    updatedAt: lesson.updated_at
});