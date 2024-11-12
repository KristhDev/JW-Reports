import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseAuth, renderUseAuth } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    AuthServiceSpy,
    hasWifiConnectionMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialPreachingStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    onFinishMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages } from '@application/constants';

/* Errors */
import { RequestError } from '@domain/errors';

AuthServiceSpy.updateEmail.mockImplementation(() => Promise.resolve());

describe('Test in useAuth hook - updateEmail', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseAuth({
            auth: authenticateStateMock,
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
            await result.current.useAuth.updateEmail({ email: 'tester@gmail.com' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        let msg = `Hemos mandado un correo de confirmación a ${ authenticateStateMock.user.email }. `;
        msg += 'Por favor revísalo. Una vez confirmes ese correo se enviará otro a tester@gmail.com. '
        msg += 'Ese también confírmalo para efectuar el cambio.'

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({ code: 200, msg });
    });

    it('should faild if email is empty', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: '' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: authMessages.EMAIL_EMPTY,
        });
    });

    it('should faild if email is invalid', async () => {
        AuthServiceSpy.updateEmail.mockRejectedValue(new RequestError('Invalid email', 400, 'invalid_email'));
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: 'invalid' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String),
        });
    });

    it('should faild if email isnt changed', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: authenticateStateMock.user.email }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: authMessages.EMAIL_UPDATE_UNCHANGED
        });
    });

    it('should faild if email exists', async () => {
        AuthServiceSpy.updateEmail.mockRejectedValue(new RequestError('Email already exists', 400, 'email_already_exists'));
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.updateEmail({ email: 'kristhdev@gmail.com' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String),
        });
    });
});