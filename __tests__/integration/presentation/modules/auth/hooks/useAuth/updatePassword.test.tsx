import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, useNetworkSpy } from '@test-setup';
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
    wifiMock
} from '@mocks';

/* Errors */
import { RequestError } from '@domain/errors';

/* Modules */
import { authMessages } from '@auth';

AuthServiceSpy.updatePassword.mockImplementation(() => Promise.resolve());

describe('Test in useAuth hook - updatePassword', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }) as any);

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

    it('should update password', async () => {
        const { result } = renderUseAuth(mockStore);

        const newPassword = '6GvuBKC0rIe39kg';

        await act(async () => {
            await result.current.useAuth.updatePassword({ password: newPassword }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: authMessages.PASSWORD_UPDATED
        });
    });

    it('should faild if password is empty', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.updatePassword({ password: '' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: authMessages.PASSWORD_EMPTY
        });
    });

    it('should faild if password is invalid', async () => {
        AuthServiceSpy.updatePassword.mockRejectedValue(new RequestError('Invalid password', 400, 'invalid_password'));
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.updatePassword({ password: 'inv' }, onFinishMock);
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });
});