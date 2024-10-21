import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseAuth, renderUseAuth } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    AuthServiceSpy,
    coursesStateMock,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialStatusStateMock,
    lessonsStateMock,
    preachingsStateMock,
    revisitsStateMock,
    wifiMock
} from '@mocks';

AuthServiceSpy.signOut.mockImplementation(() => Promise.resolve());

describe('Test in useAuth hook - signOut', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock,
    }));

    it('should close session', async () => {
        const mockStore = getMockStoreUseAuth({
            auth: authenticateStateMock,
            courses: coursesStateMock,
            lessons: lessonsStateMock,
            preaching: preachingsStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signOut();
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

    it('should faild if isAutheticated is false', async () => {
        const mockStore = getMockStoreUseAuth({
            auth: {
                ...initialAuthStateMock,
                isAuthenticated: false
            },
            courses: coursesStateMock,
            lessons: lessonsStateMock,
            preaching: preachingsStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signOut();
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...initialAuthStateMock,
            isAuthenticated: false
        });
    });

    it('should faild if hasnt wifi connection', async () => {
        useNetworkSpy.mockImplementation(() => ({
            hasWifiConnection: hasWifiConnectionMock,
            wifi: { ...wifiMock, hasConnection: false },
        }));

        const mockStore = getMockStoreUseAuth({
            auth: authenticateStateMock,
            courses: coursesStateMock,
            lessons: lessonsStateMock,
            preaching: preachingsStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signOut();
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