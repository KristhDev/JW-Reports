import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

/* Mocks */
import { grantedStateMock } from '../mocks';

/* Modules */
import { authReducer, AuthState, useAuth } from '../../src/modules/auth';
import { revisitsReducer, RevisitsState, useRevisits } from '../../src/modules/revisits';
import { permissionsReducer, statusReducer, StatusState, useStatus } from '../../src/modules/shared';

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