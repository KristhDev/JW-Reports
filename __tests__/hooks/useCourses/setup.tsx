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

import { useAuth, useCourses, useStatus } from '../../../src/hooks';

import { AuthState } from '../../../src/interfaces/auth';
import { CoursesState } from '../../../src/interfaces/courses';
import { PreachingState } from '../../../src/interfaces/preaching';
import { RevisitsState } from '../../../src/interfaces/revisits';
import { StatusState } from '../../../src/interfaces/status';

export interface InitialState {
    auth: AuthState;
    courses: CoursesState;
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

export const testRevisit = {
    about: 'Itaque quidem enim neque laudantium ducimus nesciunt provident consequuntur.',
    address: 'Ut non et similique aliquam quaerat consequatur iste ut quod.',
    next_visit: new Date('2023-03-20T00:00:00.000Z'),
    person_name: 'Karlee Senger'
}

export const getMockStore = ({ auth, courses, status }: InitialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            courses: coursesReducer,
            status: statusReducer,
            permissions: permissionsReducer,
        },
        preloadedState: {
            auth: { ...auth },
            courses: { ...courses },
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
    return renderHook(() => ({ useAuth: useAuth(), useCourses: useCourses(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}