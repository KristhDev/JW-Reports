import { Time } from '@infrasturcture/adapters';

export class ActiveOrSuspendCourseDto {
    private constructor(
        public readonly suspended: boolean,
        public readonly updated_at: string
    ) {}

    public static create(suspended: boolean): ActiveOrSuspendCourseDto {
        return new ActiveOrSuspendCourseDto(
            suspended,
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}