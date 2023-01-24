export type AuthStackParamsList = {
    LoginScreen: undefined,
    RegisterScreen: undefined
}

export interface AuthState {
    user: User;
    token: string;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
}

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    precursor: Precursor;
    createdAt: string;
    updatedAt: string;
}

export type Precursor = 'ninguno' | 'auxiliar' | 'regular' | 'especial';

export interface Profile {
    name: string;
    surname: string;
    precursor: Precursor;
}

export interface Login {
    email: string;
    password: string
}

export interface Register {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export type SetUserPayload = {
    user: User;
    token: string;
}

export interface UserPayload {
    user: User;
}