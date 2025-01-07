/* Mocks */
import { preachingEndpointMock } from '@mocks';

/* Entities */
import { PreachingEntity } from '@domain/entities';

describe('Test in PreachingEntity', () => {
    it('should convert preachingEndpoint to PreachingEntity', () => {
        const preaching = PreachingEntity.fromEndpoint(preachingEndpointMock);

        expect(preaching).toEqual({
            id: preachingEndpointMock.id,
            userId: preachingEndpointMock.user_id,
            day: preachingEndpointMock.day,
            initHour: preachingEndpointMock.init_hour,
            finalHour: preachingEndpointMock.final_hour,
            createdAt: preachingEndpointMock.created_at,
            updatedAt: preachingEndpointMock.updated_at
        });
    });
});