import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '../../../../../../jest.setup';
import { getMockStoreUseAuth, renderUseAuth } from '../../../../../setups';

/* Mocks */
import {
    coursesStateMock,
    initialAuthStateMock,
    initialStatusStateMock,
    lessonsStateMock,
    preachingsStateMock,
    revisitsStateMock,
    testCredentials,
    wifiMock
} from '../../../../../mocks';

describe('Test in useAuth hook - signOut', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    it('should close session', async () => {
        const mockStore = getMockStoreUseAuth({
            auth: initialAuthStateMock,
            courses: coursesStateMock,
            lessons: lessonsStateMock,
            preaching: preachingsStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

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

    it('should faild when isAutheticated is false', async () => {
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

        await result.current.useAuth.signOut();
    });
});