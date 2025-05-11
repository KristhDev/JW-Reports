/* DI */
import { timeAdapter } from '@config/di';

/* Interfaces */
import { RevisitFormValues } from '@revisits/interfaces';

export interface CreateRevisitDtoValues extends RevisitFormValues {
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

    public static create(values: CreateRevisitDtoValues): CreateRevisitDto {
        return new CreateRevisitDto(
            values.userId,
            values.personName,
            values.about,
            values.address,
            timeAdapter.format(values.nextVisit, timeAdapter.formats.SQL_DATETIME),
            values?.photo || null
        );
    }
}