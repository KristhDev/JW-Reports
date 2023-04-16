import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { AuthState, SetUserPayload, User, UserPayload } from '../../interfaces/auth';
import { SetIsLoadingPayload } from '../../interfaces/features';

export const INIT_USER: User = {
    id: '',
    name: '',
    surname: '',
    email: '',
    precursor: 'ninguno',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString()
}

/* Initial state */
const INITIAL_STATE: AuthState = {
    user: INIT_USER,
    isAuthenticated: false,
    isAuthLoading: false,
    token: ''
}

/* Slice of management state */
const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
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