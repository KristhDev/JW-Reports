/* Mocks */
import { courseEndpointMock } from '@mocks';

/* Entities */
import { CourseEntity } from '@domain/entities';

describe('Test in CourseEntity', () => {
    it('should convert courseEndpoint to CourseEntity', () => {
        const course = CourseEntity.fromEndpoint(courseEndpointMock);

        expect(course).toEqual({
            id: courseEndpointMock.id,
            userId: courseEndpointMock.user_id,
            personName: courseEndpointMock.person_name,
            personAbout: courseEndpointMock.person_about,
            personAddress: courseEndpointMock.person_address,
            publication: courseEndpointMock.publication,
            lastLesson: undefined,
            suspended: courseEndpointMock.suspended,
            finished: courseEndpointMock.finished,
            createdAt: courseEndpointMock.created_at,
            updatedAt: courseEndpointMock.updated_at
        });
    });
});