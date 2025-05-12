import { RevisitEntity } from '@domain/entities';

import { RevisitEndpoint } from '@infrastructure/interfaces';

export class RevisitMapper {
    public static revisitEndpointToRevisitEntity(revisitEndpoint: RevisitEndpoint): RevisitEntity {
        return {
            id: revisitEndpoint.id,
            userId: revisitEndpoint.user_id,
            personName: revisitEndpoint.person_name,
            about: revisitEndpoint.about,
            address: revisitEndpoint.address,
            photo: revisitEndpoint?.photo,
            nextVisit: revisitEndpoint.next_visit,
            done: revisitEndpoint.done,
            createdAt: revisitEndpoint.created_at,
            updatedAt: revisitEndpoint.updated_at,
        };
    }
}