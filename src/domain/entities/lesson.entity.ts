/* Interfaces */
import { LessonEndpoint } from '@infrasturcture/interfaces';

export class LessonEntity {
    private constructor(
        public readonly id: string,
        public readonly courseId: string,
        public readonly description: string,
        public readonly nextLesson: string,
        public readonly done: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string
    ) {}

    /**
     * Creates a LessonEntity from a LessonEndpoint.
     *
     * @param {LessonEndpoint} lesson - The lesson endpoint to be converted to a LessonEntity.
     * @returns {LessonEntity} - A LessonEntity with the same properties as the given LessonEndpoint.
     */
    public static fromEndpoint(lesson: LessonEndpoint): LessonEntity {
        return new LessonEntity(
            lesson.id,
            lesson.course_id,
            lesson.description,
            lesson.next_lesson,
            lesson.done,
            lesson.created_at,
            lesson.updated_at
        );
    }
}