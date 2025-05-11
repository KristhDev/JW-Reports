/* DI */
import { timeAdapter } from '@config/di';

/* Interfaces */
import { PreachingFormValues } from '@preaching/interfaces';

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
            timeAdapter.format(values.day, 'YYYY-MM-DD'),
            timeAdapter.format(values.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            timeAdapter.format(values.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}