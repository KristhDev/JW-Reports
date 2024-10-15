import { CourseFormValues } from '@courses';

interface CreateValues extends CourseFormValues {
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

    static create(values: CreateValues): CreateCourseDto {
        return new CreateCourseDto(
            values.userId,
            values.personName,
            values.personAbout,
            values.personAddress,
            values.publication
        );
    }
}