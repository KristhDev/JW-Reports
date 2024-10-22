/* Mocks */
import { userEndpointMock } from '@mocks';

/* Entities */
import { UserEntity } from '@domain/entities';

describe('Test in UserEntity', () => {
    it('should convert userEndpointMock to UserEntity', () => {
        const user = UserEntity.fromEndpoint(userEndpointMock);

        expect(user).toEqual({
            id: userEndpointMock.id,
            name: userEndpointMock.name,
            surname: userEndpointMock.surname,
            email: userEndpointMock.email,
            precursor: userEndpointMock.precursor,
            hoursRequirement: userEndpointMock.hours_requirement,
            hoursLDC: userEndpointMock.hours_ldc,
            createdAt: userEndpointMock.created_at,
            updatedAt: userEndpointMock.updated_at
        });
    });
});