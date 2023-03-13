import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test in useAuth hook resetPassword', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send reset request', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.resetPassword({ email: testCredentials.email });
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            user: {
                ...authInitState.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        let msg = `Hemos enviado un correo de restablecimiento de contraseña a ${ testCredentials.email }. `;
        msg += 'Por favor revísalo y sigue los pasos para recuperar tu cuenta.';

        expect(result.current.useStatus.state).toEqual({ code: 200, msg });
    });

    it('should fail when email is empty', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.resetPassword({ email: '' });
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
            msg: expect.any(String),
        });
    });

    it('should fail when email is invalid', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.resetPassword({ email: 'invalid' });
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
            msg: expect.any(String),
        });
    });
});