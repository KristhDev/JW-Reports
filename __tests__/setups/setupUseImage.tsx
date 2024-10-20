import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

/* Features */
import { PermissionsState, StatusState, permissionsReducer, statusReducer } from '@application/features';

/* Modules */
import { useImage, usePermissions, useStatus } from '@shared';

interface InitialState {
    permissions: PermissionsState;
    status: StatusState;
}

export const getMockStoreUseImage = ({ permissions, status }: InitialState) => {
    return configureStore({
        reducer: {
            permissions: permissionsReducer,
            status: statusReducer
        },
        preloadedState: {
            permissions: { ...permissions },
            status: { ...status }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUseImage = (store: any) => {
    return renderHook(() => ({
        useImage: useImage(),
        usePermissions: usePermissions(),
        useStatus: useStatus()
    }),
    {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}