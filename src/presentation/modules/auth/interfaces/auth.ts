import { Precursor } from '@infrasturcture/interfaces';

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
 * Defining the interface of the Profile object.
 *
 * @property {string} name - The name of the user
 * @property {string} surname - The surname of the user
 * @property {string} precursor - The precursor of the user
 * @property {number} hoursRequirement - The hours requirement of the user
 * @property {boolean} hoursLDC - The hours ldc of the user
 */
export interface ProfileData {
    name: string;
    surname: string;
    precursor: Precursor;
    hoursRequirement: number;
    hoursLDC: boolean;
}

/**
 * Defining the interface of the SignIn object.
 *
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 */
export interface SignInData {
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
export interface SignUpData {
    name: string;
    surname: string;
    email: string;
    password: string;
}

/**
 * Defining the interface of the Email object.
 *
 * @property {string} email - The email of the user
 */
export interface EmailData {
    email: string;
}

/**
 * Defining the interface of the UpdatePassword object.
 *
 * @property {string} password - The password of the user
 */
export interface UpdatePasswordData {
    password: string;
}


