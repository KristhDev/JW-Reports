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

/* Hooks */
import { useAuth, usePreaching, useStatus } from '../../../src/hooks';

/* Interfaces */
import { AuthState } from '../../../src/interfaces/auth';
import { CoursesState } from '../../../src/interfaces/courses';
import { PreachingState } from '../../../src/interfaces/preaching';
import { RevisitsState } from '../../../src/interfaces/revisits';
import { StatusState } from '../../../src/interfaces/status';

/* `export interface InitialState` is defining an interface for the initial state of the Redux store.
It includes three properties: `auth`, `preaching`, and `status`, each of which corresponds to a
slice of the store's state. The types of these properties (`AuthState`, `PreachingState`, and
`StatusState`) are defined elsewhere in the codebase and likely describe the shape of the data
stored in each slice of the store. This interface is used in the `getMockStore` and
`getMockStoreComplete` functions to create a mock Redux store with preloaded state. */
export interface InitialState {
    auth: AuthState;
    preaching: PreachingState;
    status: StatusState;
}

/* `export interface InitialStateComplete` is defining an interface for the complete initial state of
the Redux store. It includes five properties: `auth`, `courses`, `preaching`, `revisits`, and
`status`, each of which corresponds to a slice of the store's state. The types of these properties
(`AuthState`, `CoursesState`, `PreachingState`, `RevisitsState`, and `StatusState`) are defined
elsewhere in the codebase and likely describe the shape of the data stored in each slice of the
store. This interface is used in the `getMockStoreComplete` function to create a mock Redux store
with preloaded state for all slices of the store. */
export interface InitialStateComplete {
    auth: AuthState;
    courses: CoursesState;
    preaching: PreachingState;
    revisits: RevisitsState;
    status: StatusState;
}

export const onFinishMock = jest.fn();

/**
 * This function returns a configured Redux store with preloaded state and middleware.
 * @param {InitialState}  - The `getMockStore` function takes an object with three properties as its
 * parameter: `auth`, `preaching`, and `status`. These properties represent the initial state of the
 * Redux store for the `authReducer`, `preachingReducer`, and `statusReducer` respectively. The
 * function returns a configured
 * @returns A function that creates a mock Redux store with initial state provided as an argument. The
 * store has three reducers: `authReducer`, `preachingReducer`, and `statusReducer`. The initial state
 * for each reducer is spread from the corresponding property of the `InitialState` object passed as an
 * argument. The middleware used by the store has `serializableCheck` set to `false`.
 */
export const getMockStore = ({ auth, preaching, status }: InitialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            preaching: preachingReducer,
            status: statusReducer,
        },
        preloadedState: {
            auth: { ...auth },
            preaching: { ...preaching },
            status: { ...status }
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
 * `auth`, `courses`, `preaching`, `revisits`, and `status`. The preloaded state for each reducer is
 * being set based on the provided `InitialStateComplete` object. The middleware being used is also
 * being configured to ignore serializable checks.
 */
export const getMockStoreComplete = ({ auth, courses, preaching, revisits, status }: InitialStateComplete) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            courses: coursesReducer,
            preaching: preachingReducer,
            revisits: revisitsReducer,
            status: statusReducer,
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

/**
 * This function renders a React component with hooks for authentication, preaching, and status,
 * wrapped in a Redux provider.
 * @param {any} store - The `store` parameter is an object that represents the Redux store. It contains
 * the state of the application and provides methods to update the state. The `render` function is
 * using this store to wrap the components being rendered with the `Provider` component from the
 * `react-redux` library. This allows
 * @returns The `render` function is returning the result of calling the `renderHook` function with
 * three custom hooks (`useAuth`, `usePreaching`, and `useStatus`) wrapped in a `Provider` component
 * with the `store` passed as a prop. The `renderHook` function is a utility function from the
 * `@testing-library/react-hooks` library that allows testing custom hooks.
 */
export const render = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), usePreaching: usePreaching(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}