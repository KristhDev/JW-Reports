import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

/* Modules */
import {
    permissionsReducer,
    PermissionsState,
    statusReducer,
    StatusState,
    usePermissions,
    useStatus
} from '../../src/modules/shared';

interface InitialState {
    permissions: PermissionsState;
    status: StatusState;
}

export const getMockStoreUsePermissions = ({ permissions, status }: InitialState) => {
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

export const renderUsePermissions = (store: any) => {
    return renderHook(() => ({ useStatus: useStatus(), usePermissions: usePermissions() }) , {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}