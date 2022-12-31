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
    createdAt: string;
    updatedAt: string;
}

export interface Register {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export type SetIsAuthLoading = {
    isLoading: boolean;
}

export type SetUserPayload = {
    user: User;
    token: string;
}