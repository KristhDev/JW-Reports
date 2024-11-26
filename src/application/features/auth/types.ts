import { UserEntity } from '@domain/entities';

/**
 * Defining the interface of the AuthState object.
 *
 * @property {UserEntity} user - The user of the app
 * @property {string} token - The token of the user
 * @property {boolean} isAuthenticated - Whether the user is authenticated
 * @property {boolean} isAuthLoading - Whether the user is loading
 */
export interface AuthState {
    user: UserEntity;
    token: string;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
}

/**
 * SetUserPayload is an object with a user property of type UserEntity and a token property of type string.
 *
 * @property {UserEntity} user - UserEntity authenticated
 * @property {string} token - Is a string for user authentication
 */
export type SetUserPayload = {
    user: UserEntity;
    token: string;
}

/**
 * UserPayload is an object with a user property that is of type UserEntity
 *
 * @property {UserEntity} user - UserEntity authenticated
 */
export type UserPayload = {
    user: UserEntity;
}