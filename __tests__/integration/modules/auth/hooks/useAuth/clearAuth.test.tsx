import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '../../../../../../jest.setup';
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
    wifiMock
} from '../../../../../mocks';

describe('Test in useAuth hook - clearAuth', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    it('should clean authentication', async () => {
        const mockStore = getMockStoreUseAuth({
            auth: authenticateStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            preaching: initialPreachingStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseAuth(mockStore);

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        await act(async () => {
            result.current.useAuth.clearAuth();
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