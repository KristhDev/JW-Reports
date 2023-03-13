import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test in useAuth hook renew', () => {
    it('should refresh authentication', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
            await result.current.useAuth.renew();
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

    it('should fail when token is empty', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.renew();
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            user: {
                ...authInitState.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(result.current.useStatus.state).toEqual(statusInitState);
    });

    it('should fail when token is invalid', async () => {
        const mockStore = getMockStore({ auth: { ...authInitState, token: 'invalid-token' }, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.renew();
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            user: {
                ...authInitState.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });
});