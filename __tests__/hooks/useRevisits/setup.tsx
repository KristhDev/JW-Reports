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
import { useAuth, useRevisits, useStatus } from '../../../src/hooks';

/* Interfaces */
import { AuthState } from '../../../src/interfaces/auth';
import { CoursesState } from '../../../src/interfaces/courses';
import { PreachingState } from '../../../src/interfaces/preaching';
import { RevisitsState } from '../../../src/interfaces/revisits';
import { StatusState } from '../../../src/interfaces/status';

/* Defining an interface called `InitialState` which specifies the initial state of the Redux store for
the `auth`, `revisits`, and `status` features. The `AuthState`, `RevisitsState`, and `StatusState`
are likely interfaces or types that define the shape of the state for each feature. This interface
is used in the `getMockStore` function to create a mock Redux store with preloaded state for testing
purposes. */
export interface InitialState {
    auth: AuthState;
    revisits: RevisitsState;
    status: StatusState;
}

/* `export interface InitialStateComplete` is defining an interface that specifies the initial state of
the Redux store for multiple features (`auth`, `courses`, `preaching`, `revisits`, and `status`).
Each feature has its own state shape defined by the corresponding interface (`AuthState`,
`CoursesState`, `PreachingState`, `RevisitsState`, and `StatusState`). This interface is used in the
`getMockStoreComplete` function to create a mock Redux store with preloaded state for testing
purposes. */
export interface InitialStateComplete {
    auth: AuthState;
    courses: CoursesState;
    preaching: PreachingState;
    revisits: RevisitsState;
    status: StatusState;
}

export const onFinishMock = jest.fn();

/* `export const testRevisit` is defining an object with properties `about`, `address`, `next_visit`,
and `person_name`. This object is likely used for testing purposes, possibly as a mock data object
to be used in tests for the `revisits` feature. */
export const testRevisit = {
    about: 'Itaque quidem enim neque laudantium ducimus nesciunt provident consequuntur.',
    address: 'Ut non et similique aliquam quaerat consequatur iste ut quod.',
    next_visit: new Date('2023-03-20T00:00:00.000Z'),
    person_name: 'Karlee Senger'
}

/**
 * This function returns a configured Redux store with preloaded state and middleware.
 * @param {InitialState}  - - `auth`: an object representing the authentication state of the
 * application
 * @returns The function `getMockStore` is returning a configured Redux store with reducers for `auth`,
 * `revisits`, `status`, and `permissions`. The initial state for each reducer is passed as an argument
 * to the function and is used to set the preloaded state of the store. The middleware used by the
 * store is also configured to disable serializable check.
 */
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
 * This function renders a React component with hooks and a Redux store provider.
 * @param {any} store - The `store` parameter is an object that represents the Redux store. It contains
 * the state of the application and provides methods to update the state and subscribe to changes. The
 * `render` function uses this store to create a `Provider` component that wraps the components being
 * tested, so that they can access
 * @returns The `render` function is returning the result of calling the `renderHook` function with
 * three custom hooks (`useAuth`, `useRevisits`, and `useStatus`) wrapped in a `Provider` component
 * with the `store` passed as a prop. The `renderHook` function is a utility function from the
 * `@testing-library/react-hooks` library that allows testing custom hooks. Therefore
 */
export const render = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useRevisits: useRevisits(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}