import { CourseWithLessonsEntity } from '@domain/entities';

import { LessonMapper } from './lesson.mapper';

import { CourseWithLessonsEndpoint } from '@infrastructure/interfaces';

export class CourseWithLessonsMapper {
    public static courseWithLessonsEndpointToCourseWithLessonsEntity(course: CourseWithLessonsEndpoint): CourseWithLessonsEntity {
        return {
            id: course.id,
            userId: course.user_id,
            personName: course.person_name,
            personAbout: course.person_about,
            personAddress: course.person_address,
            publication: course.publication,
            lessons: (course?.lessons) ? course.lessons.map(LessonMapper.lessonEndpointToLessonEntity) : [],
            suspended: course.suspended,
            finished: course.finished,
            createdAt: course.created_at,
            updatedAt: course.updated_at
        }
    }
}