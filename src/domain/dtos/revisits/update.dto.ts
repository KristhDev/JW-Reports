import { RevisitFormValues } from '@revisits';
import { Time } from '@infrasturcture/adapters';

interface UpdateValues extends RevisitFormValues {
    updatedAt: Date;
    photo?: string;
}

export class UpdateRevisitDto {
    private constructor(
        public readonly person_name: string,
        public readonly about: string,
        public readonly address: string,
        public readonly next_visit: string,
        public readonly updated_at: string,
        public readonly photo?: string
    ) {}

    public static create(values: UpdateValues): UpdateRevisitDto {
        return new UpdateRevisitDto(
            values.personName,
            values.about,
            values.address,
            Time.format(values.nextVisit, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(values.updatedAt, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            values.photo
        );
    }
}