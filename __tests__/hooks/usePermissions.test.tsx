import React from 'react';
import { act, renderHook } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { request } from 'react-native-permissions';

/* Features */
import { statusReducer, permissionsReducer } from '../../src/features';

/* Hooks */
import { useStatus, usePermissions } from '../../src/hooks';

/* Interfaces */
import { StatusState, PermissionsState } from '../../src/interfaces';

/* Mocks */
import { grantedStateMock, initialPermissionsStateMock, initialStatusStateMock } from '../mocks';

/* The `interface InitialState` is defining the shape of an object that contains the initial state for
the `permissions` and `status` features in the Redux store. This interface is used in the
`getMockStore` function to create a Redux store with the initial state for these features. */
interface InitialState {
    permissions: PermissionsState;
    status: StatusState;
}

/**
 * The function returns a configured Redux store with preloaded state for permissions and status
 * reducers.
 * @param {InitialState}  - The `getMockStore` function takes an object with two properties as its
 * parameter: `permissions` and `status`. These properties represent the initial state of the
 * `permissions` and `status` slices of the Redux store. The function returns a configured Redux store
 * with the initial state set to the values passed
 * @returns The function `getMockStore` is returning a configured Redux store with two reducers
 * (`permissionsReducer` and `statusReducer`) and an initial state object containing `permissions` and
 * `status` properties. The initial state is passed as `preloadedState` to the `configureStore`
 * function from the Redux Toolkit library.
 */
const getMockStore = ({ permissions, status }: InitialState) => {
    return configureStore({
        reducer: {
            permissions: permissionsReducer,
            status: statusReducer
        },
        preloadedState: {
            permissions: { ...permissions },
            status: { ...status }
        }
    });
}

/**
 * This function renders a React component with hooks that use the store and provider.
 * @param {any} store - The `store` parameter is an object that represents the Redux store. It contains
 * the state of the application and provides methods to update the state and subscribe to changes. The
 * `render` function uses this store to create a `Provider` component that wraps the children
 * components and makes the store available to them
 * @returns The `render` function is returning the result of calling the `renderHook` function with two
 * arguments: a function that returns an object with two properties (`useStatus` and `usePermissions`)
 * and an options object that includes a `wrapper` property. The `wrapper` property is an anonymous
 * function that takes a `children` argument and returns a JSX expression that wraps the `children` in
 * a
 */
const render = (store: any) => {
    return renderHook(() => ({ useStatus: useStatus(), usePermissions: usePermissions() }) , {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}

describe('Test in usePermissions hook', () => {
    it('should return respective props', () => {
        const mockStore = getMockStore({ permissions: initialPermissionsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.usePermissions).toEqual({
            state: initialPermissionsStateMock,
            checkPermissions: expect.any(Function),
            askPermission: expect.any(Function),
        });
    });

    it('should getPermissions with checkPermissions', async () => {
        const mockStore = getMockStore({ permissions: initialPermissionsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePermissions.checkPermissions();
        });

        /* Check if permissions are updated */
        expect(result.current.usePermissions.state).toEqual(grantedStateMock);
    });

    it('should getPermission with askPermission', async () => {
        (request as jest.Mock).mockImplementation(() => Promise.resolve('denied'));

        const mockStore = getMockStore({ permissions: initialPermissionsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePermissions.askPermission('mediaLibrary');
        });

        /* Check if permissions are updated in property mediaLibrary */
        expect(result.current.usePermissions.state).toEqual({
            permissions: {
                ...initialPermissionsStateMock.permissions,
                mediaLibrary: 'denied'
            }
        });
    });

    it('should change status when permission is unavailable', async () => {
        (request as jest.Mock).mockImplementation(() => Promise.resolve('unavailable'));

        const mockStore = getMockStore({ permissions: initialPermissionsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePermissions.askPermission('camera');
        });

        /**
         * Check if premissions is equal to initial state and status
         * is update with respective data
         */
        expect(result.current.usePermissions.state).toEqual(initialPermissionsStateMock);
        expect(result.current.useStatus.state).toEqual({
            msg: 'Lo sentimos pero su dispositivo no soporta está funcionalidad.',
            code: 418
        });
    });
});