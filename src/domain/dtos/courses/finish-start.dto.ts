/* Adapters */
import { Time } from '@infrasturcture/adapters';

export class FinishOrStartCourseDto {
    private constructor(
        public readonly finished: boolean,
        public readonly updated_at: string
    ) {}

    /**
     * Creates a new FinishOrStartCourseDto with the given finished value and a
     * current timestamp as the updated_at value.
     *
     * @param {boolean} finished - The value to set for the finished property.
     * @returns {FinishOrStartCourseDto} - The newly created dto.
     */
    public static create(finished: boolean): FinishOrStartCourseDto {
        return new FinishOrStartCourseDto(
            finished,
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}