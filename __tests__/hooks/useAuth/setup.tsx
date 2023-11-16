import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-native';

/* Features */
import { authReducer, coursesReducer, revisitsReducer, preachingReducer, statusReducer } from '../../../src/features';

/* Hooks */
import { useAuth, useStatus } from '../../../src/hooks';

/* Interfaces */
import { AuthState, CoursesState, PreachingState, RevisitsState, StatusState } from '../../../src/interfaces';

/* Defining an interface called `InitialState` which specifies the initial state of the `auth` and
`status` slices of the Redux store. The `AuthState` and `StatusState` types are likely defined
elsewhere and are being used to specify the shape of the state for those slices. This interface is
used in the `getMockStore` function to create a mock Redux store with preloaded state. */
export interface InitialState {
    auth: AuthState;
    status: StatusState;
}

/* `export interface InitialStateComplete` is defining an interface that specifies the initial state of
the entire Redux store, including all slices (`auth`, `courses`, `preaching`, `revisits`, and
`status`). The `AuthState`, `CoursesState`, `PreachingState`, `RevisitsState`, and `StatusState`
types are likely defined elsewhere and are being used to specify the shape of the state for each
slice. This interface is used in the `getMockStoreComplete` function to create a mock Redux store
with preloaded state for all slices. */
export interface InitialStateComplete {
    auth: AuthState;
    courses: CoursesState;
    preaching: PreachingState;
    revisits: RevisitsState;
    status: StatusState;
}

/**
 * This function returns a configured Redux store with preloaded state and middleware.
 * @param {InitialState}  - The function `getMockStore` takes an object with two properties `auth` and
 * `status` as its argument. These properties represent the initial state of the `auth` and `status`
 * slices of the Redux store.
 * @returns A function that creates a mock Redux store with initial state provided as parameters.
 */
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

/**
 * The function returns a configured Redux store with preloaded state and middleware.
 * @param {InitialStateComplete}  - - `auth`: an object representing the authentication state of the
 * application
 * @returns The function `getMockStoreComplete` is returning a configured Redux store with reducers for
 * `auth`, `courses`, `preaching`, `revisits`, and `status`, and preloaded state values for each of
 * these reducers. The middleware used in the store configuration has been modified to disable
 * serializable check.
 */
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

/**
 * This function renders a React component with hooks for authentication and status using a provided
 * store.
 * @param {any} store - The `store` parameter is an object that represents the Redux store. It contains
 * the state of the application and provides methods to update the state through dispatching actions.
 * The `render` function is using this store to wrap the components being tested with a Redux Provider,
 * so that the components can access the
 * @returns The `render` function is returning the result of calling the `renderHook` function with two
 * arguments: a function that returns an object with two properties (`useAuth` and `useStatus`) and an
 * options object that includes a `wrapper` property. The `wrapper` property is an anonymous function
 * that takes a `children` argument and returns a JSX expression that wraps the `children` in a
 */
export const render = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}

/**
 * This function returns a rendered hook with the useAuth and useStatus hooks wrapped in a Provider
 * component.
 * @param {any} store - The `store` parameter is an object that represents the Redux store. It contains
 * the state of the application and provides methods to update the state. The `renderComplete` function
 * uses this store to wrap the components being tested with a `Provider` component, which allows the
 * components to access the store and
 * @returns The function `renderComplete` is returning a rendered hook using `renderHook` from the
 * `@testing-library/react-hooks` library. The hook being rendered is composed of two custom hooks
 * `useAuth` and `useStatus`. The `wrapper` prop is used to provide a Redux store to the component tree
 * using the `Provider` component from `react-redux`.
 */
export const renderComplete = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}