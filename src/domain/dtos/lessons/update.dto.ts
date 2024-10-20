import { LessonFormValues } from '@lessons';
import { Time } from '@infrasturcture/adapters';

interface UpdateValues extends LessonFormValues {}

export class UpdateLessonDto {

    private constructor(
        public readonly description: string,
        public readonly next_lesson: string,
        public readonly updated_at: string
    ) {}

    static create(values: UpdateValues): UpdateLessonDto {
        return new UpdateLessonDto(
            values.description,
            Time.format(values.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}