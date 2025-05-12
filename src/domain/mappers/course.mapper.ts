import { CourseEntity } from '@domain/entities';

import { LessonMapper } from './lesson.mapper';

import { CourseEndpoint } from '@infrastructure/interfaces';

export class CourseMapper {
    public static courseEndpointToCourseEntity(course: CourseEndpoint): CourseEntity {
        const lastLesson = course.lessons && course.lessons.length > 0 
            ? LessonMapper.lessonEndpointToLessonEntity(course.lessons[0]) 
            : undefined;

        return {
            id: course.id,
            userId: course.user_id,
            personName: course.person_name,
            personAbout: course.person_about,
            personAddress: course.person_address,
            publication: course.publication,
            lastLesson,
            suspended: course.suspended,
            finished: course.finished,
            createdAt: course.created_at,
            updatedAt: course.updated_at
        };
    }
}