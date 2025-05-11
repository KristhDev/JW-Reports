/* DI */
import { timeAdapter } from '@config/di';

/* Interfaces */
import { RevisitFormValues } from '@revisits/interfaces';

export interface UpdateRevisitDtoValues extends RevisitFormValues {
    photo?: string;
}

export class UpdateRevisitDto {
    private constructor(
        public readonly person_name: string,
        public readonly about: string,
        public readonly address: string,
        public readonly next_visit: string,
        public readonly photo: string | null,
        public readonly updated_at: string,
    ) {}

    /**
     * Creates an UpdateRevisitDto from the given UpdateRevisitDtoValues.
     *
     * @param {UpdateRevisitDtoValues} values - The values to create the UpdateRevisitDto from.
     * @return {UpdateRevisitDto} The created UpdateRevisitDto.
     */
    public static create(values: UpdateRevisitDtoValues): UpdateRevisitDto {
        return new UpdateRevisitDto(
            values.personName,
            values.about,
            values.address,
            timeAdapter.format(values.nextVisit, timeAdapter.formats.SQL_DATETIME),
            values?.photo || null,
            timeAdapter.format(new Date(), timeAdapter.formats.SQL_DATETIME),
        );
    }
}