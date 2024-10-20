import { RevisitFormValues } from '@revisits';
import { Time } from '@infrasturcture/adapters';

export interface CreateValues extends RevisitFormValues {
    userId: string;
    photo?: string | null;
}

export class CreateRevisitDto {
    private constructor(
        public readonly user_id: string,
        public readonly person_name: string,
        public readonly about: string,
        public readonly address: string,
        public readonly next_visit: string,
        public readonly photo?: string | null
    ) {}

    public static create(values: CreateValues): CreateRevisitDto {
        return new CreateRevisitDto(
            values.userId,
            values.personName,
            values.about,
            values.address,
            Time.format(values.nextVisit, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            values.photo
        );
    }
}