import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, SetUserPayload } from '../../interfaces/auth';

const INITIAL_STATE: AuthState = {
    user: {
        id: '',
        name: '',
        surname: '',
        email: '',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    isAuthenticated: false,
    isAuthLoading: false,
    token: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action: PayloadAction<SetUserPayload>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;