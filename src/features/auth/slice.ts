import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, SetUserPayload, SetIsAuthLoading, User } from '../../interfaces/auth';

const INITIAL_STATE: AuthState = {
    user: {
        id: '',
        name: '',
        surname: '',
        email: '',
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

        setUser: (state, action: PayloadAction<SetUserPayload>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isAuthLoading = false;
        },

        setIsAuthLoading: (state, action: PayloadAction<SetIsAuthLoading>) => {
            state.isAuthLoading = action.payload.isLoading;
        }
    }
});

export const { setUser, clearAuth, setIsAuthLoading } = authSlice.actions;
export default authSlice.reducer;