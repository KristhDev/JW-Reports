import { LessonFormValues } from '@lessons';
import { Time } from '@infrasturcture/adapters';

interface CreateValues extends LessonFormValues {
    courseId: string;
}

export class CreateLessonDto {
    private constructor(
        public readonly course_id: string,
        public readonly description: string,
        public readonly next_lesson: string
    ) {}

    public static create(values: CreateValues): CreateLessonDto {
        return new CreateLessonDto(
            values.courseId,
            values.description,
            Time.format(values.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS')
        );
    }
}