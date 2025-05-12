import { LessonEntity } from '@domain/entities';

import { LessonEndpoint } from '@infrastructure/interfaces';

export class LessonMapper {
    public static lessonEndpointToLessonEntity(lessonEndpoint: LessonEndpoint): LessonEntity {
        return {
            id: lessonEndpoint.id,
            courseId: lessonEndpoint.course_id,
            description: lessonEndpoint.description,
            nextLesson: lessonEndpoint.next_lesson,
            done: lessonEndpoint.done,
            createdAt: lessonEndpoint.created_at,
            updatedAt: lessonEndpoint.updated_at,
        };
    }
}