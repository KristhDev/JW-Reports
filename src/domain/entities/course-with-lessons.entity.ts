/* Entities */
import { LessonEntity } from './lesson.entity';

export interface CourseWithLessonsEntity {
    id: string;
    userId: string;
    personName: string;
    personAbout: string;
    personAddress: string;
    publication: string;
    lessons: LessonEntity[];
    suspended: boolean;
    finished: boolean;
    createdAt: string;
    updatedAt: string;
}