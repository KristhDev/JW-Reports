import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, onFinishMock, render } from './setup';

/* Mocks */
import { authenticateStateMock, initialAuthStateMock, initialStatusStateMock, testCredentials, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test in useAuth hook updateEmail', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update email', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: 'tester@gmail.com' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...authenticateStateMock,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: testCredentials.email,
                precursor: 'ninguno',
                hoursRequirement: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        let msg = `Hemos mandado un correo de confirmación a ${ testCredentials.email }. `;
        msg += 'Por favor revísalo. Una vez confirmes ese correo se enviará otro a tester@gmail.com. '
        msg += 'Ese también confírmalo para efectuar el cambio.'

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({ code: 200, msg });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when email is empty', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: '' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...authenticateStateMock,
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

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'El correo no puede estar vacío.',
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when email is invalid', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: 'invalid' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...authenticateStateMock,
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

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String),
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when email isnt changed', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: testCredentials.email }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...authenticateStateMock,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: testCredentials.email,
                precursor: 'ninguno',
                hoursRequirement: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'Para actualizar tu correo debes cambiarlo.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when email exists', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: 'kristhdev@gmail.com' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...authenticateStateMock,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: testCredentials.email,
                precursor: 'ninguno',
                hoursRequirement: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String),
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});