/* Config */
import { supabase } from '@config';

/* Errors */
import { RequestError } from '@domain/errors';

/* Dtos */
import { CreatePreachingDto, UpdatePreachingDto } from '@domain/dtos';

/* Entities */
import { PreachingEntity } from '@domain/entities';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Interfaces */
import { PreachingEndpoint } from '@infrasturcture/interfaces';

export class PreachingService {
    /**
     * Creates a new preaching and returns the created preaching.
     *
     * @param {CreatePreachingDto} dto - The data to create the preaching with.
     * @returns {Promise<PreachingEntity>} A promise that resolves with the created preaching or throws a
     * RequestError if something goes wrong.
     */
    public static async create(dto: CreatePreachingDto): Promise<PreachingEntity> {
        const result = await supabase.from('preachings')
            .insert(dto)
            .select<'*', PreachingEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return PreachingEntity.fromEndpoint(result.data);
    }

    /**
     * Deletes a preaching with the given id and user id.
     *
     * @param {string} id - The id of the preaching to delete.
     * @param {string} userId - The id of the user who is deleting the preaching.
     * @returns {Promise<void>} - A promise that resolves when the preaching is deleted.
     * @throws {RequestError} If there is an error in deleting the preaching.
     */
    public static async delete(id: string, userId: string): Promise<void> {
        const result = await supabase.from('preachings')
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
     * Retrieves preachings for a specific user within a given month.
     *
     * @param {string} userId - The ID of the user whose preachings are to be retrieved.
     * @param {Date} month - The month for which preachings are to be fetched.
     * @returns {Promise<PreachingEntity[]>} A promise that resolves with an array of preachings for the specified user and month.
     * @throws {RequestError} If there is an error in fetching the preachings.
     */
    public static async getByUserIdAndMonth(userId: string, month: Date): Promise<PreachingEntity[]> {
        const init_date = Time.getFirstDateOfMonth(month, 'YYYY-MM-DD');
        const final_date = Time.getLastDateOfMonth(month, 'YYYY-MM-DD');

        const result = await supabase.from('preachings')
            .select<'*', PreachingEndpoint>()
            .eq('user_id', userId)
            .gte('day', init_date)
            .lte('day', final_date)
            .order('day', { ascending: true })
            .order('init_hour', { ascending: true });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return result.data.map(PreachingEntity.fromEndpoint);
    }

    /**
     * Retrieves all preachings for a specific user.
     *
     * @param {string} userId - The ID of the user whose preachings are to be retrieved.
     * @returns {Promise<PreachingEntity[]>} A promise that resolves with an array of preachings for the specified user.
     * @throws {RequestError} If there is an error in fetching the preachings.
     */
    public static async getAllByUserId(userId: string): Promise<PreachingEntity[]> {
        const result = await supabase.from('preachings')
            .select<'*', PreachingEndpoint>()
            .eq('user_id', userId)
            .order('day', { ascending: true })
            .order('init_hour', { ascending: true });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return result.data.map(PreachingEntity.fromEndpoint);
    }

    /**
     * Updates a preaching with the given id and user id.
     *
     * @param {string} id - The id of the preaching to update.
     * @param {string} userId - The id of the user who is updating the preaching.
     * @param {UpdatePreachingDto} dto - The data to update the preaching with.
     * @returns {Promise<PreachingEntity>} A promise that resolves with the updated preaching or throws a
     * RequestError if something goes wrong.
     */
    public static async update(id: string, userId: string, dto: UpdatePreachingDto): Promise<PreachingEntity> {
        const result = await supabase.from('preachings')
            .update(dto)
            .eq('id', id)
            .eq('user_id', userId)
            .select<'*', PreachingEndpoint>()
            .single();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.status || 400,
                result.error.code
            );
        }

        return PreachingEntity.fromEndpoint(result.data);
    }
}