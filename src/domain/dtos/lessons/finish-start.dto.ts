/* Adapters */
import { Time } from '@infrasturcture/adapters';

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
            Time.format(values.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}