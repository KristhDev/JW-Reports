import { UserEntity } from '@domain/entities';

import { UserEndpoint } from '@infrastructure/interfaces';

export class UserMapper {
    public static userEndpointToUserEntity(userEndpoint: UserEndpoint): UserEntity {
        return {
            id: userEndpoint.id,
            name: userEndpoint.name,
            surname: userEndpoint.surname,
            email: userEndpoint.email,
            precursor: userEndpoint.precursor,
            hoursRequirement: userEndpoint.hours_requirement,
            hoursLDC: userEndpoint.hours_ldc,
            createdAt: userEndpoint.created_at,
            updatedAt: userEndpoint.updated_at,
        }
    }
}