/**
 * Defining the structure of the Preaching object in the endpoint.
 *
 * @property {string} id - This is the id of the preaching.
 * @property {string} user_id - This is the id of the user.
 * @property {string} day - This is the day of the preaching.
 * @property {string} init_hour - This is the initial hour of the preaching.
 * @property {string} final_hour - This is the final hour of the preaching.
 * @property {string} created_at - This is the created at of the preaching.
 * @property {string} updated_at - This is the updated at of the preaching.
 */
export interface PreachingEndpoint {
    id: string;
    user_id: string;
    day: string;
    init_hour: string;
    final_hour: string;
    created_at: string;
    updated_at: string;
}