import { RevisitEndpoint } from '@infrasturcture/interfaces';

export class RevisitEntity {
    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly personName: string,
        public readonly about: string,
        public readonly address: string,
        public readonly nextVisit: string,
        public readonly done: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly photo?: string,
    ) {}

    public static fromEndpoint(revisit: RevisitEndpoint): RevisitEntity {
        return new RevisitEntity(
            revisit.id,
            revisit.user_id,
            revisit.person_name,
            revisit.about,
            revisit.address,
            revisit.next_visit,
            revisit.done,
            revisit.created_at,
            revisit.updated_at,
            revisit?.photo
        );
    }
}