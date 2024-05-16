import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-native';

import { authReducer, AuthState, useAuth } from '../../src/modules/auth';
import { coursesReducer, CoursesState } from '../../src/modules/courses';
import { LessonsState } from '../../src/modules/lessons';
import { preachingReducer, PreachingState } from '../../src/modules/preaching';
import { revisitsReducer, RevisitsState } from '../../src/modules/revisits';
import { statusReducer, StatusState, useStatus } from '../../src/modules/shared';

export interface InitialState {
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