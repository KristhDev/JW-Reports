/* DI */
import { timeAdapter } from '@config/di';

/* Interfaces */
import { LessonFormValues } from '@lessons/interfaces';

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
            timeAdapter.format(values.nextLesson, timeAdapter.formats.SQL_DATETIME),
            timeAdapter.format(new Date(), timeAdapter.formats.SQL_DATETIME)
        );
    }
}