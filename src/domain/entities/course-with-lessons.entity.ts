/* Interfaces */
import { CourseWithLessonsEndpoint } from '@infrasturcture/interfaces';

/* Entities */
import { LessonEntity } from './lesson.entity';

export class CourseWithLessonsEntity {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly personName: string,
        public readonly personAbout: string,
        public readonly personAddress: string,
        public readonly publication: string,
        public readonly lessons: LessonEntity[],
        public readonly suspended: boolean,
        public readonly finished: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
    ) {}

    /**
     * Converts a CourseWithLessonsEndpoint object to a CourseWithLessons object.
     *
     * @param {CourseWithLessonsEndpoint} course - The course data from the endpoint
     * @returns {CourseWithLessonsEntity} A new CourseWithLessons object
     */
    public static fromEndpoint(course: CourseWithLessonsEndpoint): CourseWithLessonsEntity {
        return new CourseWithLessonsEntity(
            course.id,
            course.user_id,
            course.person_name,
            course.person_about,
            course.person_address,
            course.publication,
            (course?.lessons) ? course.lessons.map(LessonEntity.fromEndpoint) : [],
            course.suspended,
            course.finished,
            course.created_at,
            course.updated_at
        );
    }
}