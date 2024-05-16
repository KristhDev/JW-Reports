import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

import { authReducer, AuthState, useAuth } from '../../src/modules/auth';
import { coursesReducer, CoursesState, useCourses } from '../../src/modules/courses';
import { lessonsReducer, LessonsState, useLessons } from '../../src/modules/lessons';
import { statusReducer, StatusState, useStatus } from '../../src/modules/shared';

interface InitialState {
    auth: AuthState;
    courses: CoursesState;
    lessons: LessonsState;
    status: StatusState;
}

export const getMockStoreUseLessons = ({ auth, courses, lessons, status }: InitialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            courses: coursesReducer,
            lessons: lessonsReducer,
            status: statusReducer
        },
        preloadedState: {
            auth: { ...auth },
            courses: { ...courses },
            lessons: { ...lessons },
            status: { ...status }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUseLessons = (store: any) => {
    return renderHook(
        () => ({ useAuth: useAuth(), useCourses: useCourses(), useLessons: useLessons(), useStatus: useStatus() }),
        { wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider> }
    );
}