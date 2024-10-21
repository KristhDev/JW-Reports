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
    newUserData,
    wifiMock
} from '@mocks';

/* Errors */
import { RequestError } from '@domain/errors';

AuthServiceSpy.signUp.mockResolvedValue({ emailAlreadyExists: false });

describe('Test in useAuth hook - signUp', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        mockStore = getMockStoreUseAuth({
            auth: initialAuthStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            preaching: initialPreachingStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should create new account', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signUp(newUserData);
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

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: `Hemos enviado un correo de confirmación a ${ newUserData.email }. Por favor, revíselo y siga los pasos que se le indiquen.`
        });
    });

    it('should faild if email is invalid', async () => {
        AuthServiceSpy.signUp.mockRejectedValue(new RequestError('Invalid email', 400, 'invalid_email'));

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signUp({ ...newUserData, email: 'invalid' });
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

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });

    it('should faild if email already exisits', async () => {
        AuthServiceSpy.signUp.mockResolvedValue({ emailAlreadyExists: true });
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signUp({ ...newUserData, email: 'andredev@gmail.com' });
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

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });

    it('should faild if password is invalid', async () => {
        AuthServiceSpy.signUp.mockRejectedValue(new RequestError('Invalid password', 400, 'invalid_password'));
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signUp({ ...newUserData, password: 'inv' });
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

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });
});