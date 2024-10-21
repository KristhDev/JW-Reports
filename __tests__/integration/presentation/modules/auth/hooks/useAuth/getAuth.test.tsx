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
    testUser,
    wifiMock
} from '@mocks';

/* Errors */
import { RequestError } from '@domain/errors';

const token = 'dalsmdp32lm32kopaw';
const newToken = ';lskad;l;k2p3s2k3dk;k;;qwdkwq';

describe('Test in useAuth hook - getAuth', () => {
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

    it('should get authentication', async () => {
        AuthServiceSpy.signIn.mockResolvedValue({ token, user: testUser });
        AuthServiceSpy.getSession.mockResolvedValue({ token: newToken, user: testUser });

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
            await result.current.useAuth.getAuth();
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...initialAuthStateMock,
            isAuthenticated: true,
            token: expect.any(String),
            user: testUser
        });
    });

    it('should faild if token is empty', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.getAuth();
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

        /* Check if status state is equal to initial state */
        expect(result.current.useStatus.state).toEqual(initialStatusStateMock);
    });

    it('should faild if token is invalid', async () => {
        AuthServiceSpy.getSession.mockRejectedValue(new RequestError('In valid token', 400, 'bad_jwt'));

        const mockStore = getMockStoreUseAuth({
            auth: { ...initialAuthStateMock, token: 'invalid-token' },
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            preaching: initialPreachingStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.getAuth();
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...initialAuthStateMock,
            user: {
                ...initialAuthStateMock.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is updated */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });

    it('should faild if hasnt wifi connection', async () => {
        hasWifiConnectionMock.mockReturnValue(false);

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.getAuth();
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