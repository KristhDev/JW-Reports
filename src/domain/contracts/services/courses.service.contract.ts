import { ActiveOrSuspendCourseDto, CreateCourseDto, FinishOrStartCourseDto, UpdateCourseDto } from '@domain/dtos';

import { CourseEntity, CourseWithLessonsEntity } from '@domain/entities';

import { CourseFilter } from '@courses/interfaces';
import { PaginateOptions } from '@infrastructure/interfaces';

export abstract class CoursesServiceContract {
    public abstract activeOrSuspend(id: string, userId: string, activeOrSuspendCourseDto: ActiveOrSuspendCourseDto): Promise<CourseEntity>;
    public abstract create(createCourseDto: CreateCourseDto): Promise<CourseEntity>;
    public abstract delete(id: string, userId: string): Promise<void>;
    public abstract finishOrStart(id: string, userId: string, finishOrStartCourseDto: FinishOrStartCourseDto): Promise<CourseEntity>;
    public abstract paginateByUserId(userId: string, options: PaginateOptions<CourseFilter>): Promise<CourseEntity[]>;
    public abstract getAllByUserId(userId: string): Promise<CourseWithLessonsEntity[]>;
    public abstract getCourseIdsByUserId(userId: string): Promise<string[]>;
    public abstract update(id: string, userId: string, updateCourseDto: UpdateCourseDto): Promise<CourseEntity>;
}