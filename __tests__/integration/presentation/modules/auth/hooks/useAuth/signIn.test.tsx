import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseAuth, renderUseAuth } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    AuthServiceSpy,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialPreachingStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    testCredentials,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Errors */
import { RequestError } from '@domain/errors';

describe('Test in useAuth hook - signIn', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }) as any);

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

    it('should authenticate user', async () => {
        AuthServiceSpy.signIn.mockResolvedValue({ token: authenticateStateMock.token, user: authenticateStateMock.user });
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        /* Check if state is equal to initial state */
        expect(result.current.useAuth.state).toEqual({
            ...initialAuthStateMock,
            isAuthenticated: true,
            token: authenticateStateMock.token,
            user: authenticateStateMock.user
        });
    });

    it('should faild if credentials are invalid', async () => {
        AuthServiceSpy.signIn.mockRejectedValue(new RequestError('Invalid credentials', 400, 'invalid_credentials'));
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn({ ...testCredentials, password: 'tutu' });
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

    it('should faild if hasnt wifi connection', async () => {
        hasWifiConnectionMock.mockReturnValue(false);

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
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
    });
});