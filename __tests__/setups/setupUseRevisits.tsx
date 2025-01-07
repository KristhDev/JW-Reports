import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

/* Mocks */
import { grantedStateMock } from '@mocks';

/* Features */
import {
    authReducer,
    AuthState,
    permissionsReducer,
    revisitsReducer,
    RevisitsState,
    statusReducer,
    StatusState,
} from '@application/features';

/* Modules */
import { useAuth } from '@auth';
import { useRevisits } from '@revisits';
import { useStatus } from '@shared';

interface InitialState {
    auth: AuthState;
    revisits: RevisitsState;
    status: StatusState;
}

export const getMockStoreUseRevisits = ({ auth, revisits, status }: InitialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            revisits: revisitsReducer,
            status: statusReducer,
            permissions: permissionsReducer,
        },
        preloadedState: {
            auth: { ...auth },
            revisits: { ...revisits },
            status: { ...status },
            permissions: { ...grantedStateMock }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUseRevisits = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useRevisits: useRevisits(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}