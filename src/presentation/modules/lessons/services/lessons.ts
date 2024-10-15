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
     * Creates a new lesson and returns the created lesson or a RequestError.
     * @param {CreateLessonDto} dto The data to be used to create the lesson.
     * @returns {Promise<LessonEntity | RequestError>} The created lesson or a RequestError.
     */
    public static async create(dto: CreateLessonDto): Promise<LessonEntity | RequestError> {
        const result = await supabase.from('lessons')
            .insert(dto)
            .select<'*', LessonEndpoint>()
            .single();

        if (result.error) return new RequestError(result.error.message, result.status);
        return LessonEntity.fromEndpoint(result.data);
    }

    /**
     * Deletes a lesson with the given id and returns the error if any.
     * @param {string} id The id of the lesson to be deleted.
     * @returns {Promise<RequestError | null>} The error if any, or null if successful.
     */
    public static async delete(id: string): Promise<RequestError | null> {
        const result = await supabase.from('lessons')
            .delete()
            .eq('id', id);

        if (result.error) return new RequestError(result.error.message, result.status);
        return null;
    }

    /**
     * Deletes all lessons of the course with the given id and returns the error if any.
     * @param {string} courseId The id of the course to be deleted.
     * @returns {Promise<RequestError | null>} The error if any, or null if successful.
     */
    public static async deleteLessonsByCourseId(courseId: string): Promise<RequestError | null> {
        const result = await supabase.from('lessons')
            .delete()
            .eq('course_id', courseId);

        if (result.error) return new RequestError(result.error.message, result.status);
        return null;
    }

    /**
     * Finishes or starts a lesson with the given id and returns the updated lesson or a RequestError.
     * @param {string} id The id of the lesson to be finished or started.
     * @param {string} courseId The id of the course to which the lesson belongs.
     * @param {FinishOrStartLessonDto} dto A dto with the data to finish or start the lesson.
     * @returns {Promise<LessonEntity | RequestError>} The updated lesson or a RequestError.
     */
    public static async finishOrStart(
        id: string,
        courseId: string,
        dto: FinishOrStartLessonDto
    ): Promise<LessonEntity | RequestError> {
        const result = await supabase.from('lessons')
            .update(dto)
            .eq('id', id)
            .eq('course_id', courseId)
            .select<'*', LessonEndpoint>()
            .single();

        if (result.error) return new RequestError(result.error.message, result.status);
        return LessonEntity.fromEndpoint(result.data);
    }

    /**
     * Gets all lessons of the course with the given id and returns the lessons or a RequestError.
     * @param {string} courseId The id of the course to get the lessons from.
     * @param {GetAllOptions} options The options to filter the lessons.
     * @returns {Promise<LessonEntity[] | RequestError>} The lessons of the course if the request was successful, otherwise a RequestError.
     */
    public static async getAllByCourseId(courseId: string, options: GetAllOptions): Promise<LessonEntity[] | RequestError> {
        const lessonsPromise = supabase.from('lessons')
            .select<'*', LessonEndpoint>()
            .eq('course_id', courseId);

        if (options.search.trim().length > 0) lessonsPromise.ilike('description', `%${ options.search }%`);

        lessonsPromise.order('next_lesson', { ascending: false })
            .range(options.pagination.from, options.pagination.to);

        const result = await lessonsPromise;

        if (result.error) return new RequestError(result.error.message, result.status);
        return result.data.map(LessonEntity.fromEndpoint);
    }

    /**
     * Gets the last lesson from the courses with the given ids and returns the last lesson or a RequestError.
     * @param {string[]} courseIds The ids of the courses to get the last lesson from.
     * @returns {Promise<LessonWithCourseEntity | RequestError>} The last lesson of the courses if the request was successful, otherwise a RequestError.
     */
    public static async getLastLessonByCoursesId(courseIds: string[]): Promise<LessonWithCourseEntity | RequestError> {
        const result = await supabase.from('lessons')
            .select<'*, courses (*)', LessonWithCourseEndpoint>('*, courses (*)')
            .in('course_id', [ courseIds ])
            .order('next_lesson', { ascending: false })
            .limit(1);

        if (result.error) return new RequestError(result.error.message, result.status);
        return (result.data && result.data.length > 0)
            ? LessonWithCourseEntity.fromEndpoint(result.data[0])
            : { ...INIT_LESSON, course: INIT_COURSE };
    }

    /**
     * Updates a lesson with the given id and returns the updated lesson or a RequestError.
     * @param {string} id The id of the lesson to be updated.
     * @param {string} courseId The id of the course to which the lesson belongs.
     * @param {UpdateLessonDto} dto A dto with the data to update the lesson.
     * @returns {Promise<LessonEntity | RequestError>} The updated lesson if the request was successful, otherwise a RequestError.
     */
    public static async update(id: string, courseId: string, dto: UpdateLessonDto): Promise<LessonEntity | RequestError> {
        const result = await supabase.from('lessons')
            .update(dto)
            .eq('id', id)
            .eq('course_id', courseId)
            .select<'*', LessonEndpoint>()
            .single();

        if (result.error) return new RequestError(result.error.message, result.status);
        return LessonEntity.fromEndpoint(result.data);
    }
}