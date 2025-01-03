/* Config */
import { supabase } from '@config';

/* DTOs */
import { ActiveOrSuspendCourseDto, CreateCourseDto, FinishOrStartCourseDto, UpdateCourseDto } from '@domain/dtos';

/* Entities */
import { CourseEntity, CourseWithLessonsEntity } from '@domain/entities';

/* Errors */
import { RequestError } from '@domain/errors';

/* Interfaces */
import { CourseEndpoint, PaginateOptions } from '@infrasturcture/interfaces';
import { CourseFilter } from '@courses';

export class CoursesService {
    /**
     * This function is responsible for activating or suspending a course.
     *
     * @param {string} id - The id of the course to be updated.
     * @param {string} userId - The id of the user who is updating the course.
     * @param {ActiveOrSuspendCourseDto} dto - The dto that contains the data for the update.
     * @returns {Promise<CourseEntity>} - The updated course if the request was successful.
     */
    public static async activeOrSuspend(id: string, userId: string, dto: ActiveOrSuspendCourseDto): Promise<CourseEntity> {
        const result = await supabase.from('courses')
            .update(dto)
            .eq('id', id)
            .eq('user_id', userId)
            .select<'*', CourseEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return CourseEntity.fromEndpoint(result.data);
    }

    /**
     * This function is responsible for creating a new course.
     *
     * @param {CreateCourseDto} dto - The dto that contains the data for the new course.
     * @returns {Promise<CourseEntity>} - The newly created course if the request was successful.
     */
    public static async create(dto: CreateCourseDto): Promise<CourseEntity> {
        const result = await supabase.from('courses')
            .insert(dto)
            .select<'*', CourseEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return CourseEntity.fromEndpoint(result.data);
    }

    /**
     * Deletes a course with the given id and user id.
     *
     * @param {string} id - The id of the course to delete.
     * @param {string} userId - The id of the user who is deleting the course.
     * @returns {Promise<void>} - This function does not return anything.
     * @throws {RequestError} If there is an error in deleting the course.
     */
    public static async delete(id: string, userId: string): Promise<void> {
        const result = await supabase.from('courses')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }
    }

    /**
     * This function is responsible for finishing or starting a course.
     *
     * @param {string} id - The id of the course to be finished or started.
     * @param {string} userId - The id of the user who is finishing or starting the course.
     * @param {FinishOrStartCourseDto} dto - The dto that contains the data to update the course.
     * @returns {Promise<CourseEntity>} - The updated course if the request was successful.
     */
    public static async finishOrStart(id: string, userId: string, dto: FinishOrStartCourseDto): Promise<CourseEntity> {
        const result = await supabase.from('courses')
            .update(dto)
            .eq('id', id)
            .eq('user_id', userId)
            .select<'*', CourseEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return CourseEntity.fromEndpoint(result.data);
    }

    /**
     * Paginates courses by user ID and returns a list of courses.
     *
     * @param {string} userId - The ID of the user whose courses are to be paginated.
     * @param {PaginateOptions<CourseFilter>} options - The options for pagination, including search, filter, and pagination range.
     * @returns {Promise<CourseEntity[]>} - A promise that resolves to an array of CourseEntity objects.
     * @throws {RequestError} - If there is an error in the request.
     */
    public static async paginateByUserId(userId: string, options: PaginateOptions<CourseFilter>): Promise<CourseEntity[]> {
        const coursesPromise = supabase.from('courses')
            .select('*, lessons (*)')
            .eq('user_id', userId)

        if (options?.filter === 'active') coursesPromise.eq('suspended', false).eq('finished', false)
        else if (options?.filter === 'suspended') coursesPromise.eq('suspended', true).eq('finished', false)
        else if (options?.filter === 'finished') coursesPromise.eq('suspended', false).eq('finished', true);

        if (options.search.trim().length > 0) {
            let searchQuery = `person_name.ilike.%${ options.search }%,`;
            searchQuery += `person_about.ilike.%${ options.search }%,`;
            searchQuery += `person_address.ilike.%${ options.search }%,`;
            searchQuery += `publication.ilike.%${ options.search }%`;

            coursesPromise.or(searchQuery);
        }

        coursesPromise.order('created_at', { ascending: false })
            .order('next_lesson', { ascending: false, referencedTable: 'lessons' })
            .limit(1, { foreignTable: 'lessons' })
            .range(options.pagination.from, options.pagination.to);

        const result = await coursesPromise;

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return result.data.map(CourseEntity.fromEndpoint);
    }

    /**
     * Retrieves all courses for a specific user along with their lessons.
     *
     * @param {string} userId - The ID of the user whose courses are to be retrieved.
     * @returns {Promise<CourseWithLessonsEntity[]>} - A promise that resolves to an array of CourseWithLessonsEntity objects.
     * @throws {RequestError} - If there is an error in fetching the courses.
     */
    public static async getAllByUserId(userId: string): Promise<CourseWithLessonsEntity[]> {
        const result = await supabase.from('courses')
            .select('*, lessons (*)')
            .eq('user_id', userId)
            .order('next_lesson', { ascending: false, referencedTable: 'lessons' })
            .order('created_at', { ascending: false });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return result.data.map(CourseWithLessonsEntity.fromEndpoint);
    }

    /**
     * This function is responsible for getting all the course ids of a user.
     *
     * @param {string} userId - The id of the user.
     * @returns {Promise<string[]>} - The course ids of the user if the request was successful.
     */
    public static async getCourseIdsByUserId(userId: string): Promise<string[]> {
        const result = await supabase.from('courses')
            .select('id')
            .eq('user_id', userId);

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return result.data.map(course => course.id);
    }

    /**
     * This function is responsible for updating a course.
     *
     * @param {string} id - The id of the course.
     * @param {string} userId - The id of the user.
     * @param {UpdateCourseDto} dto - The data to update the course.
     * @returns {Promise<CourseEntity>} - The course with the updated data if the request was successful.
     */
    public static async update(id: string, userId: string, dto: UpdateCourseDto): Promise<CourseEntity> {
        const result = await supabase.from('courses')
            .update(dto)
            .eq('id', id)
            .eq('user_id', userId)
            .select<'*', CourseEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return CourseEntity.fromEndpoint(result.data);
    }
}