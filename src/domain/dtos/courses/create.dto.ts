/* Interfaces */
import { CourseFormValues } from '@courses';

export interface CreateCourseDtoValues extends CourseFormValues {
    userId: string;
}

export class CreateCourseDto {
    private constructor(
        public readonly user_id: string,
        public readonly person_name: string,
        public readonly person_about: string,
        public readonly person_address: string,
        public readonly publication: string
    ) {}

    /**
     * Creates a CreateCourseDto from the given CreateValues.
     *
     * @param {CreateCourseDtoValues} values - The CreateValues to create the CreateCourseDto from.
     * @return {CreateCourseDto} The created CreateCourseDto.
     */
    public static create(values: CreateCourseDtoValues): CreateCourseDto {
        return new CreateCourseDto(
            values.userId,
            values.personName,
            values.personAbout,
            values.personAddress,
            values.publication
        );
    }
}