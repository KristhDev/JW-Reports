import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

/* Modules */
import { authReducer, AuthState, useAuth } from '@auth';
import { permissionsReducer, PermissionsState, statusReducer, StatusState, useEmail, useImage, usePermissions, useStatus } from '@shared';

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
    return renderHook(() => ({ useAuth: useAuth(), useEmail: useEmail(), useImage: useImage(), useStatus: useStatus(), usePermissions: usePermissions() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}