import { LessonEndpoint, LessonWithCourseEndpoint } from '@infrasturcture/interfaces';
import { CourseEntity } from './course.entity';

export class LessonEntity {
    private constructor(
        public readonly id: string,
        public readonly courseId: string,
        public readonly description: string,
        public readonly nextLesson: string,
        public readonly done: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string
    ) {}

    public static fromEndpoint(lesson: LessonEndpoint): LessonEntity {
        return new LessonEntity(
            lesson.id,
            lesson.course_id,
            lesson.description,
            lesson.next_lesson,
            lesson.done,
            lesson.created_at,
            lesson.updated_at
        );
    }
}

export class LessonWithCourseEntity {
    private constructor(
        public readonly id: string,
        public readonly courseId: string,
        public readonly description: string,
        public readonly nextLesson: string,
        public readonly done: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly course: CourseEntity
    ) {}

    public static fromEndpoint(lesson: LessonWithCourseEndpoint): LessonWithCourseEntity {
        return new LessonWithCourseEntity(
            lesson.id,
            lesson.course_id,
            lesson.description,
            lesson.next_lesson,
            lesson.done,
            lesson.created_at,
            lesson.updated_at,
            CourseEntity.fromEndpoint(lesson.courses)
        );
    }
}