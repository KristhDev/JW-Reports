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
    wifiMock
} from '../../../../../mocks';

describe('Test in useAuth hook', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return respective props', () => {
        const mockStore = getMockStoreUseAuth({
            auth: initialAuthStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            preaching: initialPreachingStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseAuth(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.useAuth).toEqual({
            state: initialAuthStateMock,
            clearAuth: expect.any(Function),
            refreshAuth: expect.any(Function),
            resetPassword: expect.any(Function),
            signIn: expect.any(Function),
            signOut: expect.any(Function),
            signUp: expect.any(Function),
            updateEmail: expect.any(Function),
            updatePassword: expect.any(Function),
            updateProfile: expect.any(Function)
        });
    });
});