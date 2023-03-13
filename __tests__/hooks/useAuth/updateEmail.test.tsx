import { act } from '@testing-library/react-native';

import { initialState as authInitState, authenticateState, testCredentials } from '../../features/auth';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, onFinishMock, render } from './setup';

describe('Test in useAuth hook updateEmail', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update email', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: 'tester@gmail.com' }, onFinishMock);
        });

        expect(result.current.useAuth.state).toEqual({
            ...authenticateState,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: testCredentials.email,
                precursor: 'ninguno',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        let msg = `Hemos mandado un correo de confirmación a ${ testCredentials.email }. `;
        msg += 'Por favor revísalo. Una vez confirmes ese correo se enviará otro a tester@gmail.com. '
        msg += 'Ese también confírmalo para efectuar el cambio.'

        expect(result.current.useStatus.state).toEqual({ code: 200, msg });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when email is empty', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: '' }, onFinishMock);
        });

        expect(result.current.useAuth.state).toEqual({
            ...authenticateState,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: testCredentials.email,
                precursor: 'ninguno',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'El correo no puede estar vacío.',
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when email is invalid', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: 'invalid' }, onFinishMock);
        });

        expect(result.current.useAuth.state).toEqual({
            ...authenticateState,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: testCredentials.email,
                precursor: 'ninguno',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String),
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when email isnt changed', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: testCredentials.email }, onFinishMock);
        });

        expect(result.current.useAuth.state).toEqual({
            ...authenticateState,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: testCredentials.email,
                precursor: 'ninguno',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'Para actualizar tu correo debes cambiarlo.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when email exists', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: 'kristhdev@gmail.com' }, onFinishMock);
        });

        expect(result.current.useAuth.state).toEqual({
            ...authenticateState,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: testCredentials.email,
                precursor: 'ninguno',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String),
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});