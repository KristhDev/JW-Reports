import { PreachingReportModel } from '@domain/models';
import { RevisitEntity, CourseWithLessonsEntity } from '@domain/entities';

export interface CoursesTemplateOptions {
    fullName: string;
    courses: CourseWithLessonsEntity[];
}

export interface PreachingsTemplateOptions {
    fullName: string;
    reports: PreachingReportModel[];
}

export interface RevisitsTemplateOptions {
    fullName: string;
    revisits: RevisitEntity[];
}