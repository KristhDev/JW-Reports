/* Entities */
import { CourseEntity } from './course.entity';

export interface LessonWithCourseEntity {
    id: string;
    courseId: string;
    course: CourseEntity;
    description: string;
    nextLesson: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}