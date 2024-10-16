/* Config */
import { supabase } from '@config';

/* Features */
import { INIT_COURSE, INIT_LESSON, Pagination } from '@application/features';

/* DTOs */
import { CreateLessonDto, FinishOrStartLessonDto, UpdateLessonDto } from '@domain/dtos';

/* Entities */
import { LessonEntity, LessonWithCourseEntity } from '@domain/entities';

/* Errors */
import { RequestError } from '@domain/errors';

/* Interfaces */
import { LessonEndpoint, LessonWithCourseEndpoint } from '@infrasturcture/interfaces';

interface GetAllOptions {
    search: string;
    pagination: Pagination;
}

export class LessonsService {
    /**
     * Creates a new lesson and returns the created lesson.
     * @param {CreateLessonDto} dto The data to be used to create the lesson.
     * @returns {Promise<LessonEntity>} The created lesson.
     */
    public static async create(dto: CreateLessonDto): Promise<LessonEntity> {
        const result = await supabase.from('lessons')
            .insert(dto)
            .select<'*', LessonEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return LessonEntity.fromEndpoint(result.data);
    }

    /**
     * Deletes a lesson with the given id and returns the error if any.
     * @param {string} id The id of the lesson to be deleted.
     * @returns {Promise<void>} This function does not return anything.
     */
    public static async delete(id: string): Promise<void> {
        const result = await supabase.from('lessons')
            .delete()
            .eq('id', id);

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }
    }

    /**
     * Deletes all lessons of the course with the given id and returns the error if any.
     * @param {string} courseId The id of the course to delete the lessons from.
     * @returns {Promise<void>} This function does not return anything.
     */
    public static async deleteLessonsByCourseId(courseId: string): Promise<void> {
        const result = await supabase.from('lessons')
            .delete()
            .eq('course_id', courseId);

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }
    }

    /**
     * Finishes or starts a lesson with the given id and returns the updated lesson.
     * @param {string} id The id of the lesson to be finished or started.
     * @param {string} courseId The id of the course to which the lesson belongs.
     * @param {FinishOrStartLessonDto} dto A dto with the data to finish or start the lesson.
     * @returns {Promise<LessonEntity>} The updated lesson.
     */
    public static async finishOrStart(id: string, courseId: string, dto: FinishOrStartLessonDto): Promise<LessonEntity> {
        const result = await supabase.from('lessons')
            .update(dto)
            .eq('id', id)
            .eq('course_id', courseId)
            .select<'*', LessonEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return LessonEntity.fromEndpoint(result.data);
    }

    /**
     * Gets all lessons of the course with the given id and returns the lessons or a RequestError.
     * @param {string} courseId The id of the course to get the lessons from.
     * @param {GetAllOptions} options The options to filter the lessons.
     * @returns {Promise<LessonEntity[]>} The lessons of the course if the request was successful.
     */
    public static async getAllByCourseId(courseId: string, options: GetAllOptions): Promise<LessonEntity[]> {
        const lessonsPromise = supabase.from('lessons')
            .select<'*', LessonEndpoint>()
            .eq('course_id', courseId);

        if (options.search.trim().length > 0) lessonsPromise.ilike('description', `%${ options.search }%`);

        lessonsPromise.order('next_lesson', { ascending: false })
            .range(options.pagination.from, options.pagination.to);

        const result = await lessonsPromise;

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return result.data.map(LessonEntity.fromEndpoint);
    }

    /**
     * Gets the last lesson from the courses with the given ids and returns the last lesson.
     * @param {string[]} courseIds The ids of the courses to get the last lesson from.
     * @returns {Promise<LessonWithCourseEntity>} The last lesson of the courses if the request was successful.
     */
    public static async getLastLessonByCoursesId(courseIds: string[]): Promise<LessonWithCourseEntity> {
        const result = await supabase.from('lessons')
            .select<'*, courses (*)', LessonWithCourseEndpoint>('*, courses (*)')
            .in('course_id', [ courseIds ])
            .order('next_lesson', { ascending: false })
            .limit(1);

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return (result.data && result.data.length > 0)
            ? LessonWithCourseEntity.fromEndpoint(result.data[0])
            : { ...INIT_LESSON, course: INIT_COURSE };
    }

    /**
     * Updates a lesson with the given id and returns the updated lesson or a RequestError.
     * @param {string} id The id of the lesson to be updated.
     * @param {string} courseId The id of the course to which the lesson belongs.
     * @param {UpdateLessonDto} dto A dto with the data to update the lesson.
     * @returns {Promise<LessonEntity>} The updated lesson if the request was successful.
     */
    public static async update(id: string, courseId: string, dto: UpdateLessonDto): Promise<LessonEntity> {
        const result = await supabase.from('lessons')
            .update(dto)
            .eq('id', id)
            .eq('course_id', courseId)
            .select<'*', LessonEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return LessonEntity.fromEndpoint(result.data);
    }
}