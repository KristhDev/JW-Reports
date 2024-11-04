import { RevisitEntity, CourseWithLessonsEntity } from '@domain/entities';

export interface RevisitsTemplateOptions {
    fullName: string;
    revisits: RevisitEntity[];
}

export interface CoursesTemplateOptions {
    fullName: string;
    courses: CourseWithLessonsEntity[];
}