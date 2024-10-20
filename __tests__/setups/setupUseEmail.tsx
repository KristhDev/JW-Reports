import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

/* Features */
import {
    authReducer,
    AuthState,
    permissionsReducer,
    PermissionsState,
    statusReducer,
    StatusState
} from '@application/features';

/* Modules */
import { useAuth } from '@auth';
import { useEmail, usePermissions, useStatus } from '@shared';

interface InitialState {
    auth: AuthState;
    permissions: PermissionsState;
    status: StatusState;
}

export const getMockStoreUseEmail = ({ auth, permissions, status }: InitialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            permissions: permissionsReducer,
            status: statusReducer
        },
        preloadedState: {
            auth: { ...auth },
            permissions: { ...permissions },
            status: { ...status }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUseEmail = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useEmail: useEmail(), useStatus: useStatus(), usePermissions: usePermissions() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}