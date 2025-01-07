/* Mocks */
import { lessonEndpointMock } from '@mocks';

/* Entities */
import { LessonEntity } from '@domain/entities';

describe('Test in LessonEntity', () => {
    it('should convert lessonEndpoint to LessonEntity', () => {
        const lesson = LessonEntity.fromEndpoint(lessonEndpointMock);

        expect(lesson).toEqual({
            id: lessonEndpointMock.id,
            courseId: lessonEndpointMock.course_id,
            description: lessonEndpointMock.description,
            nextLesson: lessonEndpointMock.next_lesson,
            done: lessonEndpointMock.done,
            createdAt: lessonEndpointMock.created_at,
            updatedAt: lessonEndpointMock.updated_at
        });
    });
});