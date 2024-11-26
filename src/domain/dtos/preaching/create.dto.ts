/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Interfaces */
import { PreachingFormValues } from '@preaching';

export interface CreatePreachingDtoValues extends PreachingFormValues {
    userId: string;
}

export class CreatePreachingDto {
    private constructor(
        public readonly user_id: string,
        public readonly day: string,
        public readonly init_hour: string,
        public readonly final_hour: string
    ) {}

    /**
     * Creates a new preaching and returns the created preaching.
     *
     * @param {CreatePreachingDtoValues} values - The data to create the preaching with.
     * @returns {CreatePreachingDto} A new preaching with the given data.
     */
    public static create(values: CreatePreachingDtoValues): CreatePreachingDto {
        return new CreatePreachingDto(
            values.userId,
            Time.format(values.day, 'YYYY-MM-DD'),
            Time.format(values.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(values.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}