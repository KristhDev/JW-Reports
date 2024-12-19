import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Constants */
import { precursors } from '@application/constants';

/* Entities */
import { UserEntity } from '@domain/entities';

/* Interfaces */
import { AuthState, SetUserPayload, UserPayload } from './types';
import { SetIsLoadingPayload } from '../types';

export const INIT_USER: UserEntity = {
    id: '',
    name: '',
    surname: '',
    email: '',
    precursor: precursors.NINGUNO,
    hoursRequirement: 0,
    hoursLDC: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}

/* Initial state */
export const AUTH_INITIAL_STATE: AuthState = {
    user: INIT_USER,
    isAuthenticated: false,
    isAuthLoading: false,
    token: ''
}

/* Slice of management state */
const authSlice = createSlice({
    name: 'auth',
    initialState: AUTH_INITIAL_STATE,
    reducers: {
        clearAuth: (state) => {
            state.user = INIT_USER;
            state.token = '';
            state.isAuthenticated = false;
            state.isAuthLoading = false;
        },

        setIsAuthLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isAuthLoading = action.payload.isLoading;
        },

        setUser: (state, action: PayloadAction<SetUserPayload>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isAuthLoading = false;
        },

        updateUser: (state, action: PayloadAction<UserPayload>) => {
            state.user = action.payload.user;
            state.isAuthLoading = false;
        }
    }
});

export const { clearAuth, setIsAuthLoading, setUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
