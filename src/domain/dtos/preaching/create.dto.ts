import { PreachingFormValues } from '@preaching';
import { Time } from '@infrasturcture/adapters';

interface CreateValues extends PreachingFormValues {
    userId: string;
}

export class CreatePreachingDto {
    private constructor(
        public readonly user_id: string,
        public readonly day: string,
        public readonly init_hour: string,
        public readonly final_hour: string
    ) {}

    static create(values: CreateValues): CreatePreachingDto {
        return new CreatePreachingDto(
            values.userId,
            Time.format(values.day, 'YYYY-MM-DD'),
            Time.format(values.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(values.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}