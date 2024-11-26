export type Precursor = 'ninguno' | 'auxiliar' | 'regular' | 'especial';

/**
 * Defining the interface of the User object in the endpoint.
 *
 * @property {string} id - The id of the user
 * @property {string} name - The name of the user
 * @property {string} surname - The surname of the user
 * @property {string} email - The email of the user
 * @property {string} precursor - The precursor of the user
 * @property {number} hours_requirement - The hours requirement of the user
 * @property {boolean} hours_ldc - The hours ldc of the user
 * @property {string} created_at - The created at of the user
 * @property {string} updated_at - The updated at of the user
 */
export interface UserEndpoint {
    id: string;
    name: string;
    surname: string;
    email: string;
    precursor: Precursor;
    hours_requirement: number;
    hours_ldc: boolean;
    created_at: string;
    updated_at: string;
}