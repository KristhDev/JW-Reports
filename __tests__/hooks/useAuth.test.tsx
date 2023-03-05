import React from 'react';
import { act, renderHook } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { supabase } from '../supabase';

import { authReducer } from '../../src/features/auth';
import { statusReducer } from '../../src/features/status';

import { initialState as authInitState, newUserData } from '../features/auth';
import { initialState as statusInitState } from '../features/status';

import { useAuth, useStatus } from '../../src/hooks';

import { AuthState } from '../../src/interfaces/auth';
import { StatusState } from '../../src/interfaces/status';

interface InitialState {
    auth: AuthState;
    status: StatusState;
}

const getMockStore = ({ auth, status }: InitialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            status: statusReducer
        },
        preloadedState: {
            auth: { ...auth },
            status: { ...status }
        }
    });
}

const render = (store: any) => {
    return renderHook(() => ({ useAuth: useAuth(), useStatus: useStatus() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}

describe('Test in useAuth hook', () => {
    it('should return respective props', () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        expect(result.current.useAuth).toEqual({
            state: authInitState,
            clearAuth: expect.any(Function),
            renew: expect.any(Function),
            resetPassword: expect.any(Function),
            signIn: expect.any(Function),
            signOut: expect.any(Function),
            signUp: expect.any(Function),
            updateEmail: expect.any(Function),
            updatePassword: expect.any(Function),
            updateProfile: expect.any(Function)
        });
    });

    it('should create new account with signUp', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signUp(newUserData);
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            isAuthenticated: true,
            token: undefined,
            user: {
                id: expect.any(String),
                name: newUserData.name,
                surname: newUserData.surname,
                email: newUserData.email,
                precursor: 'ninguno',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: `Hemos enviado un correo de confirmación a ${ newUserData.email }. Por favor, revíselo y siga los pasos que se le indiquen.`
        });

        await supabase.auth.admin.deleteUser(result.current.useAuth.state.user.id);
    });

    it('should faild signUp when email is invalid', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signUp({ ...newUserData, email: 'invalid' });
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            user: {}
        });

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });

    it('should faild signUp when email already exisits', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signUp({ ...newUserData, email: 'andredev@gmail.com' });
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            user: {}
        });

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });

    it('should faild signUp when password is invalid', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signUp({ ...newUserData, password: 'inv' });
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            user: {}
        });

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });

    it('should authenticate user with signIn', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn({ email: 'andredev@gmail.com', password: 'tutuyoyo9102' });
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            isAuthenticated: true,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: 'andredev@gmail.com',
                precursor: 'ninguno',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });

    it('should fail signIn when credentials are invalid', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn({ email: 'andredev@gmail.com', password: 'tutu' });
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            user: {}
        });

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });
});