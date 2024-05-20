import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '../../../../../../jest.setup';
import { getMockStoreUseAuth, renderUseAuth } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialPreachingStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    testCredentials,
    wifiMock
} from '../../../../../mocks';

describe('Test in useAuth hook - refreshAuth', () => {
    useNetworkSpy.mockImplementation(() => ({
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

    it('should refresh authentication', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
            await result.current.useAuth.refreshAuth();
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...initialAuthStateMock,
            isAuthenticated: true,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: 'André',
                surname: 'Rivera',
                email: 'andredev@gmail.com',
                precursor: 'ninguno',
                hoursRequirement: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });

    it('should faild when token is empty', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.refreshAuth();
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

    it('should faild when token is invalid', async () => {
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
            await result.current.useAuth.refreshAuth();
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
});