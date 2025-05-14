/* DI */
import { timeAdapter } from '@config/di';

/* Interfaces */
import { CourseFormValues } from '@courses/interfaces';

export type UpdateCourseDtoValues = CourseFormValues;

export class UpdateCourseDto {
    private constructor(
        public readonly person_name: string,
        public readonly person_about: string,
        public readonly person_address: string,
        public readonly publication: string,
        public readonly updated_at: string
    ) {}

    /**
     * Creates an UpdateCourseDto from the given UpdateCourseDtoValues.
     *
     * @param {UpdateCourseDtoValues} values - The UpdateCourseDtoValues to create the UpdateCourseDto from.
     * @return {UpdateCourseDto} The created UpdateCourseDto.
     */
    public static create(values: UpdateCourseDtoValues): UpdateCourseDto {
        return new UpdateCourseDto(
            values.personName,
            values.personAbout,
            values.personAddress,
            values.publication,
            timeAdapter.format(new Date(), timeAdapter.formats.SQL_DATETIME)
        );
    }
}