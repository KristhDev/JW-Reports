/* Setup */
import { getMockStoreUseAuth, renderUseAuth } from '@setups';

/* Mocks */
import {
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialPreachingStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

describe('Test in useAuth hook', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

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
            getAuth: expect.any(Function),
            isAuthenticated: expect.any(Function),
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