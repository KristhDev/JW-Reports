/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Interfaces */
import { LessonFormValues } from '@lessons';

export interface UpdateLessonDtoValues extends LessonFormValues {}

export class UpdateLessonDto {

    private constructor(
        public readonly description: string,
        public readonly next_lesson: string,
        public readonly updated_at: string
    ) {}

    /**
     * Creates an UpdateLessonDto from the given UpdateLessonDtoValues.
     *
     * @param {UpdateLessonDtoValues} values - The values to create the UpdateLessonDto from.
     * @return {UpdateLessonDto} The created UpdateLessonDto.
     */
    public static create(values: UpdateLessonDtoValues): UpdateLessonDto {
        return new UpdateLessonDto(
            values.description,
            Time.format(values.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}