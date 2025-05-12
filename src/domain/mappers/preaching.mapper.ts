import { PreachingEntity } from '@domain/entities';

import { PreachingEndpoint } from '@infrastructure/interfaces';

export class PreachingMapper {
    public static preachingEndpointToPreachingEntity(preachingEndpoint: PreachingEndpoint): PreachingEntity {
        return {
            id: preachingEndpoint.id,
            userId: preachingEndpoint.user_id,
            day: preachingEndpoint.day,
            initHour: preachingEndpoint.init_hour,
            finalHour: preachingEndpoint.final_hour,
            createdAt: preachingEndpoint.created_at,
            updatedAt: preachingEndpoint.updated_at,
        };
    }
}