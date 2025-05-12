/* Entities */
import { LessonEntity } from './lesson.entity';

export interface CourseEntity {
    id: string;
    userId: string;
    personName: string;
    personAbout: string;
    personAddress: string;
    publication: string;
    lastLesson?: LessonEntity;
    suspended: boolean;
    finished: boolean;
    createdAt: string;
    updatedAt: string;
}