import { LessonWithCourseEntity } from '@domain/entities';

import { CourseMapper } from './course.mapper';

import { LessonWithCourseEndpoint } from '@infrastructure/interfaces';

export class LessonWithCourseMapper {
    public static lessonWithCourseEndpointToLessonWithCourseEntity(
        lessonWithCourseEndpoint: LessonWithCourseEndpoint
    ): LessonWithCourseEntity {
        return {
            id: lessonWithCourseEndpoint.id,
            courseId: lessonWithCourseEndpoint.course_id,
            course: CourseMapper.courseEndpointToCourseEntity(lessonWithCourseEndpoint.courses),
            description: lessonWithCourseEndpoint.description,
            nextLesson: lessonWithCourseEndpoint.next_lesson,
            done: lessonWithCourseEndpoint.done,
            createdAt: lessonWithCourseEndpoint.created_at,
            updatedAt: lessonWithCourseEndpoint.updated_at,
        };
    }
}