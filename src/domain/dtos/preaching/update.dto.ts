/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Interfaces */
import { PreachingFormValues } from '@preaching';

export interface UpdatePreachingDtoValues extends PreachingFormValues {}

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
            Time.format(values.day, 'YYYY-MM-DD'),
            Time.format(values.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(values.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}