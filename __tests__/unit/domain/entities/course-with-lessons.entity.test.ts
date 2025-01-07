/* Mocks */
import { courseEndpointMock, courseWithLessonsEndpointMock } from '@mocks';

/* Entities */
import { CourseWithLessonsEntity } from '@domain/entities';

describe('Test in CourseWithLessonsEntity', () => {
    it('should convert CourseWithLessonsEndpoint to CourseWithLessonsEntity', () => {
        const course = CourseWithLessonsEntity.fromEndpoint(courseWithLessonsEndpointMock);

        expect(course).toEqual({
            id: courseEndpointMock.id,
            userId: courseEndpointMock.user_id,
            personName: courseEndpointMock.person_name,
            personAbout: courseEndpointMock.person_about,
            personAddress: courseEndpointMock.person_address,
            publication: courseEndpointMock.publication,
            lessons: [
                {
                    id: courseWithLessonsEndpointMock.lessons[0].id,
                    courseId: courseWithLessonsEndpointMock.lessons[0].course_id,
                    description: courseWithLessonsEndpointMock.lessons[0].description,
                    nextLesson: courseWithLessonsEndpointMock.lessons[0].next_lesson,
                    done: courseWithLessonsEndpointMock.lessons[0].done,
                    createdAt: courseWithLessonsEndpointMock.lessons[0].created_at,
                    updatedAt: courseWithLessonsEndpointMock.lessons[0].updated_at
                }
            ],
            suspended: courseEndpointMock.suspended,
            finished: courseEndpointMock.finished,
            createdAt: courseEndpointMock.created_at,
            updatedAt: courseEndpointMock.updated_at
        });
    });
});