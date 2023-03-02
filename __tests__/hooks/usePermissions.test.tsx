import React from 'react';
import { act, renderHook } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { request } from 'react-native-permissions';

import { statusReducer } from '../../src/features/status';
import { permissionsReducer } from '../../src/features/permissions';

import { useStatus, usePermissions } from '../../src/hooks';

import { initialState as statusInitState, } from '../features/status';
import { grantedState, initialState as permissionsInitState, } from '../features/permissions';

import { StatusState } from '../../src/interfaces/status';
import { PermissionsState } from '../../src/interfaces/permissions';

interface InitialState {
    permissions: PermissionsState;
    status: StatusState;
}

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

const render = (store: any) => {
    return renderHook(() => ({ useStatus: useStatus(), usePermissions: usePermissions() }) , {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}

describe('Test in usePermissions hook', () => {
    it('should return respective props', () => {
        const mockStore = getMockStore({ permissions: permissionsInitState, status: statusInitState });
        const { result } = render(mockStore);

        expect(result.current.usePermissions).toEqual({
            state: permissionsInitState,
            checkPermissions: expect.any(Function),
            askPermission: expect.any(Function),
        });
    });

    it('should getPermissions with checkPermissions', async () => {
        const mockStore = getMockStore({ permissions: permissionsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePermissions.checkPermissions();
        });

        expect(result.current.usePermissions.state).toEqual(grantedState);
    });

    it('should getPermission with askPermission', async () => {
        (request as jest.Mock).mockImplementation(() => Promise.resolve('denied'));

        const mockStore = getMockStore({ permissions: permissionsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePermissions.askPermission('mediaLibrary');
        });

        expect(result.current.usePermissions.state).toEqual({
            permissions: {
                ...permissionsInitState.permissions,
                mediaLibrary: 'denied'
            }
        });
    });

    it('should change status when permission is unavailable', async () => {
        (request as jest.Mock).mockImplementation(() => Promise.resolve('unavailable'));

        const mockStore = getMockStore({ permissions: permissionsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePermissions.askPermission('camera');
        });

        expect(result.current.usePermissions.state).toEqual(permissionsInitState);
        expect(result.current.useStatus.state).toEqual({
            msg: 'Lo sentimos pero su dispositivo no soporta está funcionalidad.',
            code: 418
        });
    });
});