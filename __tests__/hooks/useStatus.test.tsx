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
            setSupabaseError: expect.any(Function)
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