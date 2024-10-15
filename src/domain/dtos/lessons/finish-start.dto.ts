import { Time } from '@infrasturcture/adapters';

export interface FinishOrStartValues {
    done: boolean;
    nextLesson: Date;
}

export class FinishOrStartLessonDto {
    private constructor(
        public readonly done: boolean,
        public readonly next_lesson: string,
        public readonly updated_at: string
    ) {}

    static create(values: FinishOrStartValues): FinishOrStartLessonDto {
        return new FinishOrStartLessonDto(
            values.done,
            Time.format(values.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}