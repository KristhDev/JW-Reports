
/**
 * Type representing the valid precursor values that can be used in the User object.
 *
 * @type {string} - The precursor value (e.g., 'ninguno', 'auxiliar', 'regular', 'especial')
 */
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

export interface AuthMessages {
    CONFIRM_PASSWORD_EMPTY: string;
    EMAIL_ALREADY_REGISTERED: string;
    EMAIL_EMPTY: string;
    EMAIL_INVALID: string;
    EMAIL_UPDATE_UNCHANGED: string;
    NAME_EMPTY: string;
    NAME_MIN_LENGTH: string;
    PASSWORD_EMPTY: string;
    PASSWORD_MIN_LENGTH: string;
    PASSWORD_NOT_MATCH: string;
    PASSWORD_UPDATED: string;
    PROFILE_UPDATED: string;
    SURNAME_EMPTY: string;
    SURNAME_MIN_LENGTH: string;
    UNAUTHENTICATED: string;
    UNAUTHORIZED: string;
}

export interface PrecursorMessages {
    PRECURSOR_EMPTY: string;
    PRECURSOR_INVALID: string;
}

export interface AuthPlaceholders {
    EMAIL: string;
    PASSWORD: string;
    CONFIRM_PASSWORD: string;
    CONFIRM_NEW_PASSWORD: string;
    HOURS_REQUIREMENT: string;
    NAME: string;
    SURNAME: string;
}