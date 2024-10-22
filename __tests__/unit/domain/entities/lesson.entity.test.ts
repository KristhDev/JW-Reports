/* Mocks */
import { lessonEndpointMock, lessonWithCourseEndpointMock } from '@mocks';

/* Entities */
import { LessonEntity, LessonWithCourseEntity } from '@domain/entities';

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

    it('should convert lessonWithCourse to LessonWithCourseEntity', () => {
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