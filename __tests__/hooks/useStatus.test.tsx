import React from 'react';
import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';

/* Hooks */
import { useStatus } from '../../src/hooks';

/* Features */
import { statusReducer } from '../../src/features/status';
import { errorState, initialState as statusInitState, successState } from '../features/status';

/* Interfaces */
import { StatusState } from '../../src/interfaces/status';

/**
 * This function returns a mock Redux store with an initial state for a specific reducer.
 * @param {StatusState} initialState - The initial state of the Redux store for the "status" slice of
 * the state tree. It is an object that contains the initial values of the state properties for the
 * "status" slice. This parameter is used to create a preloaded state for the Redux store.
 * @returns The function `getMockStore` is returning a configured Redux store with a `status` reducer
 * and an initial state provided as a parameter. The initial state is spread into an object and passed
 * as the preloaded state to the store.
 */
const getMockStore = (initialState: StatusState) => {
    return configureStore({
        reducer: {
            status: statusReducer,
        },
        preloadedState: {
            status: { ...initialState }
        }
    });
}

/**
 * This function renders a React component using a Redux store and a custom hook.
 * @param {any} store - The `store` parameter is an object that represents the Redux store. It contains
 * the state of the application and provides methods to update the state and subscribe to changes. The
 * `render` function uses this store to create a `Provider` component that wraps the `useStatus` hook.
 * This allows the
 * @returns The `render` function is returning the result of calling the `renderHook` function with two
 * arguments: a function that returns the result of calling the `useStatus` hook, and an object with a
 * `wrapper` property that is a function that takes a `children` prop and returns a JSX element that
 * wraps the `children` prop in a `Provider` component with the `store` prop
 */
const render = (store: any) => {
    return renderHook(() => useStatus(), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}

describe('Test in useStatus hook', () => {
    it('should return the initial state', () => {
        const mockStore = getMockStore({ ...statusInitState });
        const { result } = render(mockStore);

        /* Check if hook return respective properties */
        expect(result.current).toEqual({
            state: statusInitState,
            clearStatus: expect.any(Function),
            setErrorForm: expect.any(Function),
            setStatus: expect.any(Function),
            setSupabaseError: expect.any(Function),
            setUnauthenticatedError: expect.any(Function)
        });
    });

    it('should change the state with setStatus', () => {
        const mockStore = getMockStore({ ...statusInitState });
        const { result } = render(mockStore);

        /* Check if state is equal to initial state */
        expect(result.current.state).toEqual(statusInitState);

        act(() => {
            result.current.setStatus({ ...successState });
        });

        /* Check if state is updated */
        expect(result.current.state).toEqual(successState);
    });

    it('should change the state with setErrorForm', () => {
        const mockStore = getMockStore({ ...statusInitState });
        const { result } = render(mockStore);

        /* Check if state is equal to initial state */
        expect(result.current.state).toEqual(statusInitState);

        act(() => {
            result.current.setErrorForm({ name: 'El nombre es obligatorio' });
        });

        /* Check if state is updated */
        expect(result.current.state).toEqual({
            msg: 'El nombre es obligatorio',
            code: 400
        });
    });

    it('should clean state with clearStatus', () => {
        const mockStore = getMockStore({ ...errorState });
        const { result } = render(mockStore);

        /* Check if state is equal to error state */
        expect(result.current.state).toEqual(errorState);

        act(() => {
            result.current.clearStatus();
        });

        /* Check if state is cleaning */
        expect(result.current.state).toEqual(statusInitState);
    });
});