import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

import { authReducer } from '../../../src/features/auth';
import { coursesReducer } from '../../../src/features/courses';
import { preachingReducer } from '../../../src/features/preaching';
import { revisitsReducer } from '../../../src/features/revisits';
import { statusReducer } from '../../../src/features/status';
import { permissionsReducer } from '../../../src/features/permissions';

import { grantedState } from '../../features/permissions';

import { useAuth, useRevisits, useStatus } from '../../../src/hooks';

import { AuthState } from '../../../src/interfaces/auth';
import { CoursesState } from '../../../src/interfaces/courses';
import { PreachingState } from '../../../src/interfaces/preaching';
import { RevisitsState } from '../../../src/interfaces/revisits';
import { StatusState } from '../../../src/interfaces/status';

export interface InitialState {
    auth: AuthState;
    revisits: RevisitsState;
    status: StatusState;
}

export interface InitialStateComplete {
    auth: AuthState;
    courses: CoursesState;
    preaching: PreachingState;
    revisits: RevisitsState;
    status: StatusState;
}

export const onFinishMock = jest.fn();

export const getMockStore = ({ auth, revisits, status }: InitialState) => {
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
            permissions: { ...grantedState }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const getMockStoreComplete = ({ auth, courses, preaching, revisits, status }: InitialStateComplete) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            courses: coursesReducer,
            preaching: preachingReducer,
            revisits: revisitsReducer,
            status: statusReducer,
            permissions: permissionsReducer
        },
        preloadedState: {
            auth: { ...auth },
            courses: { ...courses },
            preaching: { ...preaching },
            revisits: { ...revisits },
            status: { ...status },
            permissions: { ...grantedState }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const render = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useRevisits: useRevisits(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}