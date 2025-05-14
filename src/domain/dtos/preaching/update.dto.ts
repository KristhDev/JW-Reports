/* DI */
import { timeAdapter } from '@config/di';

/* Interfaces */
import { PreachingFormValues } from '@preaching/interfaces';

export type UpdatePreachingDtoValues = PreachingFormValues;

export class UpdatePreachingDto {

    private constructor(
        public readonly day: string,
        public readonly init_hour: string,
        public readonly final_hour: string,
        public readonly updated_at: string
    ) {}

    /**
     * Creates an UpdatePreachingDto from the given UpdatePreachingDtoValues.
     *
     * @param {UpdatePreachingDtoValues} values - The values to create the UpdatePreachingDto from.
     * @return {UpdatePreachingDto} The created UpdatePreachingDto.
     */
    public static create(values: UpdatePreachingDtoValues): UpdatePreachingDto {
        return new UpdatePreachingDto(
            timeAdapter.format(values.day, timeAdapter.formats.DATE_ONLY),
            timeAdapter.format(values.initHour, timeAdapter.formats.SQL_DATETIME),
            timeAdapter.format(values.finalHour, timeAdapter.formats.SQL_DATETIME),
            timeAdapter.format(new Date(), timeAdapter.formats.SQL_DATETIME)
        );
    }
}