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
    createdAt: Date;
    updatedAt: Date;
}

export type SetUserPayload = {
    user: User;
    token: string;
}