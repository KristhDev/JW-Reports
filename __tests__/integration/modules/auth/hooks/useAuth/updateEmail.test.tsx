import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, useNetworkSpy } from '@test-setup';
import { getMockStoreUseAuth, renderUseAuth } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialPreachingStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    testCredentials,
    wifiMock
} from '@mocks';

describe('Test in useAuth hook - updateEmail', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseAuth({
            auth: initialAuthStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            preaching: initialPreachingStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should update email', async () => {
        const { result } = renderUseAuth(mockStore);

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
                hoursLDC: false,
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

    it('should faild when email is empty', async () => {
        const { result } = renderUseAuth(mockStore);

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
                hoursRequirement: 0,
                hoursLDC: false,
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

    it('should faild when email is invalid', async () => {
        const { result } = renderUseAuth(mockStore);

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
                hoursRequirement: 0,
                hoursLDC: false,
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

    it('should faild when email isnt changed', async () => {
        const { result } = renderUseAuth(mockStore);

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
                hoursLDC: false,
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

    it('should faild when email exists', async () => {
        const { result } = renderUseAuth(mockStore);

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
                hoursLDC: false,
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