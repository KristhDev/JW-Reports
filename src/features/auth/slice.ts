import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, SetUserPayload, User, UserPayload } from '../../interfaces/auth';
import { SetIsLoadingPayload } from '../../interfaces/features';

const INITIAL_STATE: AuthState = {
    user: {
        id: '',
        name: '',
        surname: '',
        email: '',
        precursor: 'ninguno',
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
    },
    isAuthenticated: false,
    isAuthLoading: false,
    token: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        clearAuth: (state) => {
            state.user = {} as User;
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