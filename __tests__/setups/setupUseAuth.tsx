import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-native';

import {
    authReducer,
    AuthState,
    coursesReducer,
    CoursesState,
    LessonsState,
    preachingReducer,
    PreachingState,
    revisitsReducer,
    RevisitsState,
    statusReducer,
    StatusState,
} from '@application/features';

import { useAuth } from '@auth';
import { useStatus } from '@shared';

interface InitialState {
    auth: AuthState;
    courses: CoursesState;
    lessons: LessonsState;
    preaching: PreachingState;
    revisits: RevisitsState;
    status: StatusState;
}

export const getMockStoreUseAuth = ({ auth, courses, preaching, revisits, status }: InitialState) => {
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

export const renderUseAuth = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}