import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

import { authReducer, AuthState, useAuth } from '@auth';
import { preachingReducer, PreachingState, usePreaching } from '@preaching';
import { statusReducer, StatusState, useStatus } from '@shared';

interface InitialState {
    auth: AuthState;
    preaching: PreachingState;
    status: StatusState;
}

export const getMockStoreUsePreaching = ({ auth, preaching, status }: InitialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            preaching: preachingReducer,
            status: statusReducer
        },
        preloadedState: {
            auth: { ...auth },
            preaching: { ...preaching },
            status: { ...status }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUsePreaching = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), usePreaching: usePreaching(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}