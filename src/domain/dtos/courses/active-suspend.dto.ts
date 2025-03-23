/* Adapters */
import { TimeAdapter } from '@infrastructure/adapters';

export class ActiveOrSuspendCourseDto {
    private constructor(
        public readonly suspended: boolean,
        public readonly updated_at: string
    ) {}

    /**
     * Creates a new ActiveOrSuspendCourseDto with the given suspended value and a
     * current timestamp as the updated_at value.
     *
     * @param {boolean} suspended - The value to set for the suspended property.
     * @returns {ActiveOrSuspendCourseDto} - The newly created dto.
     */
    public static create(suspended: boolean): ActiveOrSuspendCourseDto {
        return new ActiveOrSuspendCourseDto(
            suspended,
            TimeAdapter.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}