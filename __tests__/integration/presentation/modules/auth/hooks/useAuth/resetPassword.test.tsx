import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseAuth, renderUseAuth } from '@setups';

/* Mocks */
import {
    AuthServiceSpy,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialPreachingStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    testCredentials,
    wifiMock
} from '@mocks';

/* Errors */
import { RequestError } from '@domain/errors';

describe('Test in useAuth hook - resetPassword', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock,
        hasWifiConnection: hasWifiConnectionMock
    }));

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

    it('should send reset request', async () => {
        AuthServiceSpy.resetPassword.mockImplementation(() => Promise.resolve());

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.resetPassword({ email: testCredentials.email });
        });

        /* Check if state is equal to initial state */
        expect(result.current.useAuth.state).toEqual({
            ...initialAuthStateMock,
            user: {
                ...initialAuthStateMock.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        let msg = `Hemos enviado un correo de restablecimiento de contraseña a ${ testCredentials.email }. `;
        msg += 'Por favor revísalo y sigue los pasos para recuperar tu cuenta.';

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({ code: 200, msg });
    });

    it('should faild if email is empty', async () => {
        AuthServiceSpy.resetPassword.mockRejectedValue(new RequestError('Email is empty', 400, 'bad_request'));
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.resetPassword({ email: '' });
        });

        /* Check if state is equal to initial state */
        expect(result.current.useAuth.state).toEqual({
            ...initialAuthStateMock,
            user: {
                ...initialAuthStateMock.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if state of status is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String),
        });
    });

    it('should faild if email is invalid', async () => {
        AuthServiceSpy.resetPassword.mockRejectedValue(new RequestError('Email is invalid', 400, 'bad_request'));
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.resetPassword({ email: 'invalid' });
        });

        /* Check if state is equal to initial state */
        expect(result.current.useAuth.state).toEqual({
            ...initialAuthStateMock,
            user: {
                ...initialAuthStateMock.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if state of status is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String),
        });
    });
});