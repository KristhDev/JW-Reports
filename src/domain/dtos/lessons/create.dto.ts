/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Interfaces */
import { LessonFormValues } from '@lessons';

export interface CreateLessonDtoValues extends LessonFormValues {
    courseId: string;
}

export class CreateLessonDto {
    private constructor(
        public readonly course_id: string,
        public readonly description: string,
        public readonly next_lesson: string
    ) {}

    /**
     * Creates a CreateLessonDto from the given CreateLessonDtoValues.
     *
     * @param {CreateLessonDtoValues} values - The values to create the CreateLessonDto from.
     * @return {CreateLessonDto} The created CreateLessonDto.
     */
    public static create(values: CreateLessonDtoValues): CreateLessonDto {
        return new CreateLessonDto(
            values.courseId,
            values.description,
            Time.format(values.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}