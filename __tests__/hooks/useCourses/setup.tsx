import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

/* Features */
import { authReducer } from '../../../src/features/auth';
import { coursesReducer } from '../../../src/features/courses';
import { preachingReducer } from '../../../src/features/preaching';
import { revisitsReducer } from '../../../src/features/revisits';
import { statusReducer } from '../../../src/features/status';
import { permissionsReducer } from '../../../src/features/permissions';

/* Features - test */
import { grantedState } from '../../features/permissions';

/* Hooks */
import { useAuth, useCourses, useStatus } from '../../../src/hooks';

/* Interfaces */
import { AuthState } from '../../../src/interfaces/auth';
import { CoursesState } from '../../../src/interfaces/courses';
import { PreachingState } from '../../../src/interfaces/preaching';
import { RevisitsState } from '../../../src/interfaces/revisits';
import { StatusState } from '../../../src/interfaces/status';

/* The `export interface InitialState` is defining an interface that describes the initial state of the
Redux store. It includes properties for `auth`, `courses`, and `status`, which are all objects that
represent the state of their respective features in the application. This interface can be used to
create a preloaded state for the store when it is configured. */
export interface InitialState {
    auth: AuthState;
    courses: CoursesState;
    status: StatusState;
}

/* `export interface InitialStateComplete` is defining an interface that describes the complete initial
state of the Redux store. It includes properties for `auth`, `courses`, `preaching`, `revisits`, and
`status`, which are all objects that represent the state of their respective features in the
application. This interface can be used to create a preloaded state for the store when it is
configured. */
export interface InitialStateComplete {
    auth: AuthState;
    courses: CoursesState;
    preaching: PreachingState;
    revisits: RevisitsState;
    status: StatusState;
}

export const onFinishMock = jest.fn();

/* `export const testCourse` is defining an object that represents a test course with properties for
`person_about`, `person_address`, `person_name`, and `publication`. This object can be used in tests
to simulate a course object in the application. */
export const testCourse = {
    person_about: 'Itaque quidem enim neque laudantium ducimus nesciunt provident consequuntur.',
    person_address: 'Ut non et similique aliquam quaerat consequatur iste ut quod.',
    person_name: 'Karlee Senger',
    publication: 'dolorem ut non'
}

/* `export const testLesson` is defining an object that represents a test lesson with properties for
`description` and `next_lesson`. This object can be used in tests to simulate a lesson object in the
application. The `next_lesson` property is a `Date` object set to March 20, 2023 at midnight UTC. */
export const testLesson = {
    description: 'Temporibus ut dignissimos aliquam dignissimos facere recusandae. Illo a provident quasi iusto quidem qui tempora vel adipisci. Quia eum ut recusandae laudantium quidem. Quisquam non fugiat dicta qui voluptatem.',
    next_lesson: new Date('2023-03-20T00:00:00.000Z')
}

/**
 * This function returns a configured Redux store with preloaded state and middleware.
 * @param {InitialState}  - The `getMockStore` function takes an object with three properties as its
 * parameter: `auth`, `courses`, and `status`. These properties represent the initial state of the
 * Redux store for the `authReducer`, `coursesReducer`, and `statusReducer` respectively. The function
 * returns a configured Redux store
 * @returns The function `getMockStore` is being returned.
 */
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

/**
 * This function returns a complete mock store for a TypeScript React application with preloaded state
 * and middleware.
 * @param {InitialStateComplete}  - - `auth`: an object representing the authentication state of the
 * application
 * @returns The function `getMockStoreComplete` is returning a configured Redux store with reducers for
 * `auth`, `courses`, `preaching`, `revisits`, `status`, and `permissions`. The preloaded state for
 * each reducer is being set based on the provided `InitialStateComplete` object. The middleware being
 * used is also being configured to ignore serializable checks.
 */
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

/**
 * This function renders a React component with hooks for authentication, courses, and status, wrapped
 * in a Redux provider.
 * @param {any} store - The `store` parameter is an object that represents the Redux store. It contains
 * the state of the application and provides methods to update the state. The `render` function uses
 * this store to create a `Provider` component that wraps the children components and makes the store
 * available to them through the `connect
 * @returns The `render` function is returning the result of calling the `renderHook` function with
 * three custom hooks (`useAuth`, `useCourses`, and `useStatus`) wrapped in a `Provider` component with
 * the `store` passed as a prop. The `renderHook` function is a utility function from the
 * `@testing-library/react-hooks` library that allows testing custom hooks. The returned value
 */
export const render = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useCourses: useCourses(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}