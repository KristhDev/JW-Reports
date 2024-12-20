/* Config */
import { supabase } from '@config';

/* Features */
import { INIT_REVISIT } from '@application/features';

/* DTOs */
import { CompleteRevisitDto, CreateRevisitDto, UpdateRevisitDto } from '@domain/dtos';

/* Entities */
import { RevisitEntity } from '@domain/entities';

/* Errors */
import { RequestError } from '@domain/errors';

/* Interfaces */
import { PaginateOptions, RevisitEndpoint } from '@infrasturcture/interfaces';
import { RevisitFilter } from '@revisits';

export class RevisitsService {
    /**
     * Completes a revisit by updating the given fields.
     *
     * @param {string} id - The id of the revisit to update.
     * @param {string} userId - The id of the user that owns the revisit.
     * @param {CompleteRevisitDto} dto - The data to update the revisit with.
     * @returns {Promise<RevisitEntity>} The updated revisit.
     * @throws {RequestError} If the request fails.
     */
    public static async complete(id: string, userId: string, dto: CompleteRevisitDto): Promise<RevisitEntity> {
        const result = await supabase.from('revisits')
            .update(dto)
            .eq('id', id)
            .eq('user_id', userId)
            .select<'*', RevisitEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return RevisitEntity.fromEndpoint(result.data);
    }

    /**
     * Creates a new revisit with the given data.
     *
     * @param {CreateRevisitDto} dto - The data to create the revisit with.
     * @returns {Promise<RevisitEntity>} A promise that resolves with the created revisit
     */
    public static async create(dto: CreateRevisitDto): Promise<RevisitEntity> {
        const result = await supabase.from('revisits')
            .insert(dto)
            .select<'*', RevisitEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return RevisitEntity.fromEndpoint(result.data);
    }

    /**
     * Deletes a revisit with the given id from the given user.
     *
     * @param {string} id - The id of the revisit to delete.
     * @param {string} userId - The id of the user that owns the revisit.
     * @returns {Promise<void>} A promise that resolves when the revisit is deleted.
     * @throws {RequestError} If the request fails.
     */
    public static async delete(id: string, userId: string): Promise<void> {
        const result = await supabase.from('revisits')
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
     * Paginates revisits for a specific user based on the given options.
     *
     * @param {string} userId - The ID of the user whose revisits are to be paginated.
     * @param {PaginateOptions<RevisitFilter>} options - The options to filter and paginate revisits.
     * - filter: Specifies the revisit filter - 'visited' or 'unvisited'.
     * - search: A search string to filter revisits by name, about, or address.
     * - pagination: Contains 'from' and 'to' indices for pagination.
     * @returns {Promise<RevisitEntity[]>} A promise that resolves to an array of revisits for the user.
     * @throws {RequestError} If there is an error in fetching the revisits.
     */
    public static async paginateByUserId(userId: string, options: PaginateOptions<RevisitFilter>): Promise<RevisitEntity[]> {
        const revisitsPromise = supabase.from('revisits')
            .select<'*', RevisitEndpoint>()
            .eq('user_id', userId);

        if (options.filter === 'visited') revisitsPromise.eq('done', true);
        else if (options.filter === 'unvisited') revisitsPromise.eq('done', false);

        if (options.search.trim().length > 0) {
            let searchQuery = `person_name.ilike.%${ options.search }%,`;
            searchQuery += `about.ilike.%${ options.search }%,`;
            searchQuery += `address.ilike.%${ options.search }%`;

            revisitsPromise.or(searchQuery);
        }

        revisitsPromise.order('next_visit', { ascending: false })
            .order('created_at', { ascending: false })
            .range(options.pagination.from, options.pagination.to);

        const result = await revisitsPromise;

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return result.data.map(RevisitEntity.fromEndpoint);
    }

    /**
     * Retrieves all revisits for a specific user.
     *
     * @param {string} userId - The ID of the user whose revisits are to be retrieved.
     * @returns {Promise<RevisitEntity[]>} A promise that resolves to an array of revisits for the user.
     * @throws {RequestError} If there is an error in fetching the revisits.
     */
    public static async getAllByUserId(userId: string): Promise<RevisitEntity[]> {
        const result = await supabase.from('revisits')
            .select<'*', RevisitEndpoint>()
            .eq('user_id', userId)
            .order('next_visit', { ascending: false })
            .order('created_at', { ascending: false });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return result.data.map(RevisitEntity.fromEndpoint);
    }

    /**
     * Gets the last revisit of a user with the given id.
     *
     * @param {string} userId - The id of the user whose last revisit to get.
     * @returns {Promise<RevisitEntity>} A promise that resolves with the last revisit
     * or a RequestError if something goes wrong.
     */
    public static async getLastByUserId(userId: string): Promise<RevisitEntity> {
        const result = await supabase.from('revisits')
            .select<'*', RevisitEndpoint>('*')
            .eq('user_id', userId)
            .order('next_visit', { ascending: false })
            .limit(1);

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return (result.data && result.data?.length > 0) ? RevisitEntity.fromEndpoint(result.data[0]) : INIT_REVISIT;
    }

    /**
     * Updates a revisit with the given id and user id and returns the updated revisit.
     *
     * @param {string} id - The id of the revisit to update.
     * @param {string} userId - The id of the user who owns the revisit to update.
     * @param {UpdateRevisitDto} dto - The update revisit dto.
     * @returns {Promise<RevisitEntity>} A promise that resolves with the updated revisit
     */
    public static async update(id: string, userId: string, dto: UpdateRevisitDto): Promise<RevisitEntity> {
        const result = await supabase.from('revisits')
            .update(dto)
            .eq('id', id)
            .eq('user_id', userId)
            .select<'*', RevisitEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return RevisitEntity.fromEndpoint(result.data);
    }
}