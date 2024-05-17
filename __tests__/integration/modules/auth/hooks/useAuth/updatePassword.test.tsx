import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock } from '../../../../../../jest.setup';
import { getMockStoreUseAuth, renderUseAuth } from '../../../../../setups';

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
} from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseAuth({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    preaching: initialPreachingStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
});

describe('Test in useAuth hook - updatePassword', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update password', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        const newPassword = '6GvuBKC0rIe39kg';

        await act(async () => {
            await result.current.useAuth.updatePassword({ password: newPassword }, onFinishMock);
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
            code: 200,
            msg: 'Has actualizado tu contraseña correctamente.'
        });

        await act(async () => {
            await result.current.useAuth.updatePassword({ password: testCredentials.password });
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when password is empty', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updatePassword({ password: '' }, onFinishMock);
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
            msg: 'La contraseña no puede estar vacía.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when password is invalid', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updatePassword({ password: 'inv' }, onFinishMock);
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
            msg: expect.any(String)
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});