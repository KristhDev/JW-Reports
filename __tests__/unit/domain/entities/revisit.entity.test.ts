/* Mocks */
import { revisitEndpointMock } from '@mocks';

/* Entities */
import { RevisitEntity } from '@domain/entities';

describe('Test in RevisitEntity', () => {
    it('should convert revisitEndpointMock to RevisitEntity', () => {
        const revisit = RevisitEntity.fromEndpoint(revisitEndpointMock);

        expect(revisit).toEqual({
            id: revisitEndpointMock.id,
            userId: revisitEndpointMock.user_id,
            personName: revisitEndpointMock.person_name,
            about: revisitEndpointMock.about,
            address: revisitEndpointMock.address,
            nextVisit: revisitEndpointMock.next_visit,
            done: revisitEndpointMock.done,
            createdAt: revisitEndpointMock.created_at,
            updatedAt: revisitEndpointMock.updated_at
        });
    });
});