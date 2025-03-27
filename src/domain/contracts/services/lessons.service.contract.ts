import { CreateLessonDto, FinishOrStartLessonDto, UpdateLessonDto } from '@domain/dtos';

import { LessonEntity, LessonWithCourseEntity } from '@domain/entities';
import { PaginateOptions } from '@infrastructure/interfaces';

export abstract class LessonsServiceContract {
    public abstract create(createLessonDto: CreateLessonDto): Promise<LessonEntity>;
    public abstract delete(id: string): Promise<void>;
    public abstract deleteLessonsByCourseId(courseId: string): Promise<void>;
    public abstract finishOrStart(id: string, courseId: string, finishOrStartLessonDto: FinishOrStartLessonDto): Promise<LessonEntity>;
    public abstract paginateByCourseId(courseId: string, options: PaginateOptions): Promise<LessonEntity[]>;
    public abstract getLastLessonByCoursesId(courseIds: string[]): Promise<LessonWithCourseEntity>;
    public abstract update(id: string, courseId: string, updateLessonDto: UpdateLessonDto): Promise<LessonEntity>;
}