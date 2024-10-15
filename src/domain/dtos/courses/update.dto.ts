import { CourseFormValues } from '@courses';
import { Time } from '@infrasturcture/adapters';

interface CreateValues extends CourseFormValues {}

export class UpdateCourseDto {
    private constructor(
        public readonly person_name: string,
        public readonly person_about: string,
        public readonly person_address: string,
        public readonly publication: string,
        public readonly updated_at: string
    ) {}

    static create(values: CreateValues): UpdateCourseDto {
        return new UpdateCourseDto(
            values.personName,
            values.personAbout,
            values.personAddress,
            values.publication,
            Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}