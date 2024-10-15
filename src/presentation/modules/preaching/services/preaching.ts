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
     * Creates a new preaching and returns the created preaching or a RequestError.
     * @param {CreatePreachingDto} dto The data to be used to create the preaching.
     * @returns {Promise<PreachingEntity | RequestError>} The created preaching or a RequestError.
     */
    public static async create(dto: CreatePreachingDto): Promise<PreachingEntity | RequestError> {
        const result = await supabase.from('preachings')
            .insert(dto)
            .select<'*', PreachingEndpoint>()
            .single();

        if (result.error) return new RequestError(result.error.message, result.status);
        return PreachingEntity.fromEndpoint(result.data);
    }

    /**
     * Deletes a preaching and returns null if the request was successful, otherwise a RequestError.
     * @param {string} id - The id of the preaching to be deleted.
     * @param {string} userId - The id of the user who is deleting the preaching.
     * @returns {Promise<RequestError | null>} null if the request was successful, otherwise a RequestError.
     */
    public static async delete(id: string, userId: string): Promise<RequestError | null> {
        const result = await supabase.from('preachings')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

        if (result.error) return new RequestError(result.error.message, result.status);

        return null;
    }

    /**
     * Gets all the preachings of a user in a given month.
     *
     * @param {string} userId - The id of the user.
     * @param {Date} month - The month to get the preachings from.
     * @returns {Promise<PreachingEntity[] | RequestError>} An array of preachings or a RequestError if something goes wrong.
     */
    public static async getByUserIdAndMonth(userId: string, month: Date): Promise<PreachingEntity[] | RequestError> {
        const init_date = Time.getFirstDateOfMonth(month, 'YYYY-MM-DD');
        const final_date = Time.getLastDateOfMonth(month, 'YYYY-MM-DD');

        const result = await supabase.from('preachings')
            .select<'*', PreachingEndpoint>()
            .eq('user_id', userId)
            .gte('day', init_date)
            .lte('day', final_date)
            .order('day', { ascending: true })
            .order('init_hour', { ascending: true });

        if (result.error) return new RequestError(result.error.message, result.status);
        return result.data.map(PreachingEntity.fromEndpoint);
    }

    /**
     * Updates a preaching and returns the updated preaching or a RequestError if something goes wrong.
     * @param {string} id - The id of the preaching to be updated.
     * @param {string} userId - The id of the user who is updating the preaching.
     * @param {UpdatePreachingDto} dto - The update preaching data transfer object.
     * @returns {Promise<PreachingEntity | RequestError>} The updated preaching or a RequestError if something goes wrong.
     */
    public static async update(id: string, userId: string, dto: UpdatePreachingDto): Promise<PreachingEntity | RequestError> {
        const result = await supabase.from('preachings')
            .update(dto)
            .eq('id', id)
            .eq('user_id', userId)
            .select<'*', PreachingEndpoint>()
            .single();

        if (result.error) return new RequestError(result.error.message, result.status);
        return PreachingEntity.fromEndpoint(result.data);
    }
}