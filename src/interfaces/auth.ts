/**
 * AuthStackParamsList is a type that is an object with three properties, each of which
 * is a screens that takes no arguments and returns undefined.
 * @property LoginScreen - undefined,
 * @property RegisterScreen - undefined,
 * @property ForgotPasswordScreen - undefined
 */
export type AuthStackParamsList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    ForgotPasswordScreen: undefined
}

/* Defining the interface of the AuthState object. */
export interface AuthState {
    user: User;
    token: string;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
}

/* Defining the interface of the User object. */
export interface User {
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

/* Defining the interface of the Profile object. */
export interface Profile {
    name: string;
    surname: string;
    precursor: Precursor;
    hours_requirement: number;
}

/* Defining the interface of the SignIn object. */
export interface SignIn {
    email: string;
    password: string
}

/* Defining the interface of the SignUp object. */
export interface SignUp {
    name: string;
    surname: string;
    email: string;
    password: string;
}

/**
 * SetUserPayload is an object with a user property of type User and a token property of type string.
 * @property {User} user - User authenticated
 * @property {string} token - Is a string for user authentication
 */
export type SetUserPayload = {
    user: User;
    token: string;
}

/**
 * UserPayload is an object with a user property that is of type User
 * @property {User} user - User authenticated
 */
export type UserPayload = {
    user: User;
}