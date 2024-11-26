/* Interfaces */
import { LessonWithCourseEndpoint } from '@infrasturcture/interfaces';

/* Entities */
import { CourseEntity } from './course.entity';

export class LessonWithCourseEntity {
    private constructor(
        public readonly id: string,
        public readonly courseId: string,
        public readonly course: CourseEntity,
        public readonly description: string,
        public readonly nextLesson: string,
        public readonly done: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
    ) {}

    /**
     * Creates a LessonWithCourseEntity from a LessonWithCourseEndpoint.
     *
     * @param {LessonWithCourseEndpoint} lesson - The lesson endpoint to be converted to a LessonWithCourseEntity.
     * @returns {LessonWithCourseEntity} - A LessonWithCourseEntity with the same properties as the given LessonWithCourseEndpoint.
     */
    public static fromEndpoint(lesson: LessonWithCourseEndpoint): LessonWithCourseEntity {
        return new LessonWithCourseEntity(
            lesson.id,
            lesson.course_id,
            CourseEntity.fromEndpoint(lesson.courses),
            lesson.description,
            lesson.next_lesson,
            lesson.done,
            lesson.created_at,
            lesson.updated_at
        );
    }
}