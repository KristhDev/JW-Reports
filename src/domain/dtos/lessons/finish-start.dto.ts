/* DI */
import { timeAdapter } from '@config/di';

export interface FinishOrStartDtoValues {
    done: boolean;
    nextLesson: Date;
}

export class FinishOrStartLessonDto {
    private constructor(
        public readonly done: boolean,
        public readonly next_lesson: string,
        public readonly updated_at: string
    ) {}

    /**
     * Creates a FinishOrStartLessonDto from the given values.
     *
     * @param {FinishOrStartDtoValues} values - The values to create the FinishOrStartLessonDto from.
     * @return {FinishOrStartLessonDto} The created FinishOrStartLessonDto.
     */
    public static create(values: FinishOrStartDtoValues): FinishOrStartLessonDto {
        return new FinishOrStartLessonDto(
            values.done,
            timeAdapter.format(values.nextLesson, timeAdapter.formats.SQL_DATETIME),
            timeAdapter.format(new Date(), timeAdapter.formats.SQL_DATETIME)
        );
    }
}