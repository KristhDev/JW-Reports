import { CourseEndpoint } from '@infrasturcture/interfaces';
import { LessonEntity } from './lessons.entity';

export class CourseEntity {
    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly personName: string,
        public readonly personAbout: string,
        public readonly personAddress: string,
        public readonly publication: string,
        public readonly lastLesson: LessonEntity | undefined,
        public readonly suspended: boolean,
        public readonly finished: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string
    ) {}

    public static fromEndpoint(course: CourseEndpoint): CourseEntity {
        return new CourseEntity(
            course.id,
            course.user_id,
            course.person_name,
            course.person_about,
            course.person_address,
            course.publication,
            course.lessons ? LessonEntity.fromEndpoint(course.lessons[0]) : undefined,
            course.suspended,
            course.finished,
            course.created_at,
            course.updated_at
        );
    }
}