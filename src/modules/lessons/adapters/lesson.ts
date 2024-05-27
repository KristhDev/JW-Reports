import { Lesson, LessonEndpoint } from '../interfaces';

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