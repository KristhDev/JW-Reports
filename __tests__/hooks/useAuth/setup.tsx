import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-native';

import { authReducer } from '../../../src/features/auth';
import { coursesReducer } from '../../../src/features/courses';
import { revisitsReducer } from '../../../src/features/revisits';
import { preachingReducer } from '../../../src/features/preaching';
import { statusReducer } from '../../../src/features/status';

import { useAuth, useStatus } from '../../../src/hooks';

import { AuthState } from '../../../src/interfaces/auth';
import { CoursesState } from '../../../src/interfaces/courses';
import { PreachingState } from '../../../src/interfaces/preaching';
import { RevisitsState } from '../../../src/interfaces/revisits';
import { StatusState } from '../../../src/interfaces/status';

export interface InitialState {
    auth: AuthState;
    status: StatusState;
}

export interface InitialStateComplete {
    auth: AuthState;
    courses: CoursesState;
    preaching: PreachingState;
    revisits: RevisitsState;
    status: StatusState;
}

export const getMockStore = ({ auth, status }: InitialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            status: statusReducer
        },
        preloadedState: {
            auth: { ...auth },
            status: { ...status }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const onFinishMock = jest.fn();

export const getMockStoreComplete = ({ auth, courses, preaching, revisits, status }: InitialStateComplete) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            courses: coursesReducer,
            preaching: preachingReducer,
            revisits: revisitsReducer,
            status: statusReducer
        },
        preloadedState: {
            auth: { ...auth },
            courses: { ...courses },
            preaching: { ...preaching },
            revisits: { ...revisits },
            status: { ...status }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const render = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}

export const renderComplete = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}