/**
 * AuthStackParamsList is a type that is an object with three properties, each of which
 * is a screens that takes no arguments and returns undefined.
 *
 * @property LoginScreen - undefined,
 * @property RegisterScreen - undefined,
 * @property ForgotPasswordScreen - undefined
 */
export type AuthStackParamsList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    ForgotPasswordScreen: undefined
}

/**
 * Defining the interface of the AuthState object.
 *
 * @property {User} user - The user of the app
 * @property {string} token - The token of the user
 * @property {boolean} isAuthenticated - Whether the user is authenticated
 * @property {boolean} isAuthLoading - Whether the user is loading
 */
export interface AuthState {
    user: User;
    token: string;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
}

/**
 * Defining the interface of the User object.
 *
 * @property {string} id - The id of the user
 * @property {string} name - The name of the user
 * @property {string} surname - The surname of the user
 * @property {string} email - The email of the user
 * @property {string} precursor - The precursor of the user
 * @property {number} hoursRequirement - The hours requirement of the user
 * @property {string} createdAt - The created at of the user
 * @property {string} updatedAt - The updated at of the user
 */
export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    precursor: Precursor;
    hoursRequirement: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * Defining the interface of the User object in the endpoint.
 *
 * @property {string} id - The id of the user
 * @property {string} name - The name of the user
 * @property {string} surname - The surname of the user
 * @property {string} email - The email of the user
 * @property {string} precursor - The precursor of the user
 * @property {number} hours_requirement - The hours requirement of the user
 * @property {string} createdAt - The created at of the user
 * @property {string} updatedAt - The updated at of the user
 */
export interface UserEndpoint {
    id: string;
    name: string;
    surname: string;
    email: string;
    precursor: Precursor;
    hours_requirement: number;
    createdAt: string;
    updatedAt: string;
}

export type Precursor = 'ninguno' | 'auxiliar' | 'regular' | 'especial';

/**
 * Defining the interface of the Profile object.
 *
 * @property {string} name - The name of the user
 * @property {string} surname - The surname of the user
 * @property {string} precursor - The precursor of the user
 * @property {number} hoursRequirement - The hours requirement of the user
 */
export interface Profile {
    name: string;
    surname: string;
    precursor: Precursor;
    hoursRequirement: number;
}

/**
 * Defining the interface of the SignIn object.
 *
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 */
export interface SignIn {
    email: string;
    password: string
}

/**
 * Defining the interface of the SignUp object.
 *
 * @property {string} name - The name of the user
 * @property {string} surname - The surname of the user
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 */
export interface SignUp {
    name: string;
    surname: string;
    email: string;
    password: string;
}

/**
 * SetUserPayload is an object with a user property of type User and a token property of type string.
 *
 * @property {User} user - User authenticated
 * @property {string} token - Is a string for user authentication
 */
export type SetUserPayload = {
    user: User;
    token: string;
}

/**
 * UserPayload is an object with a user property that is of type User
 *
 * @property {User} user - User authenticated
 */
export type UserPayload = {
    user: User;
}
