import { PreachingFormValues } from '@preaching';
import { Time } from '@infrasturcture/adapters';

interface UpdateValues extends PreachingFormValues {}

export class UpdatePreachingDto {

    private constructor(
        public readonly day: string,
        public readonly init_hour: string,
        public readonly final_hour: string,
        public readonly updated_at: string
    ) {}

    static create(values: UpdateValues): UpdatePreachingDto {
        return new UpdatePreachingDto(
            Time.format(values.day, 'YYYY-MM-DD'),
            Time.format(values.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(values.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}