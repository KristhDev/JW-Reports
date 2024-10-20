import { PreachingEndpoint } from '@infrasturcture/interfaces';

export class PreachingEntity {
    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly day: string,
        public readonly initHour: string,
        public readonly finalHour: string,
        public readonly createdAt: string,
        public readonly updatedAt: string
    ) {}

    public static fromEndpoint(preaching: PreachingEndpoint): PreachingEntity {
        return new PreachingEntity(
            preaching.id,
            preaching.user_id,
            preaching.day,
            preaching.init_hour,
            preaching.final_hour,
            preaching.created_at,
            preaching.updated_at
        );
    }
}