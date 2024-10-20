import { Time } from '@infrasturcture/adapters';

export class FinishOrStartCourseDto {
    private constructor(
        public readonly done: boolean,
        public readonly updated_at: string
    ) {}

    public static create(done: boolean): FinishOrStartCourseDto {
        return new FinishOrStartCourseDto(
            done,
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}