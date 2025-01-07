/* Mocks */
import { lessonWithCourseEndpointMock } from '@mocks';

/* Entities */
import { LessonWithCourseEntity } from '@domain/entities';

describe('Test in LessonWithCourseEntity', () => {
    it('should convert lessonWithCourseEndpoint to LessonWithCourseEntity', () => {
        const lesson = LessonWithCourseEntity.fromEndpoint(lessonWithCourseEndpointMock);

        expect(lesson).toEqual({
            id: lessonWithCourseEndpointMock.id,
            courseId: lessonWithCourseEndpointMock.course_id,
            course: {
                id: lessonWithCourseEndpointMock.courses.id,
                userId: lessonWithCourseEndpointMock.courses.user_id,
                personName: lessonWithCourseEndpointMock.courses.person_name,
                personAbout: lessonWithCourseEndpointMock.courses.person_about,
                personAddress: lessonWithCourseEndpointMock.courses.person_address,
                publication: lessonWithCourseEndpointMock.courses.publication,
                lastLesson: undefined,
                suspended: lessonWithCourseEndpointMock.courses.suspended,
                finished: lessonWithCourseEndpointMock.courses.finished,
                createdAt: lessonWithCourseEndpointMock.courses.created_at,
                updatedAt: lessonWithCourseEndpointMock.courses.updated_at
            },
            description: lessonWithCourseEndpointMock.description,
            nextLesson: lessonWithCourseEndpointMock.next_lesson,
            done: lessonWithCourseEndpointMock.done,
            createdAt: lessonWithCourseEndpointMock.created_at,
            updatedAt: lessonWithCourseEndpointMock.updated_at
        });
    });
});