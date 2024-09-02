import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

/* Modules */
import { authReducer, AuthState, useAuth } from '@auth';
import { coursesReducer, CoursesState, useCourses } from '@courses';
import { lessonsReducer, LessonsState, useLessons } from '@lessons';
import { statusReducer, StatusState, useStatus } from '@shared';

interface InitialState {
    auth: AuthState;
    courses: CoursesState;
    lessons: LessonsState;
    status: StatusState;
}

export const getMockStoreUseCourses = ({ auth, courses, lessons, status }: InitialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            courses: coursesReducer,
            lessons: lessonsReducer,
            status: statusReducer,
        },
        preloadedState: {
            auth: { ...auth },
            courses: { ...courses },
            lessons: { ...lessons },
            status: { ...status },
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUseCourses = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useCourses: useCourses(), useLessons: useLessons(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}