/* Adapters */
import { TimeAdapter } from '@infrastructure/adapters';

/* Interfaces */
import { PreachingFormValues } from '@preaching/interfaces';

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
            TimeAdapter.format(values.day, 'YYYY-MM-DD'),
            TimeAdapter.format(values.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            TimeAdapter.format(values.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            TimeAdapter.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}