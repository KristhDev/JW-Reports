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
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';

describe('Test in useAuth hook - updateProfile', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        mockStore = getMockStoreUseAuth({
            auth: authenticateStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            preaching: initialPreachingStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should update user info', async () => {
        const newName = 'Gerard';
        const newSurname = 'Orn';

        AuthServiceSpy.updateProfile.mockResolvedValue({
            ...authenticateStateMock.user,
            name: newName,
            surname: newSurname,
            precursor: 'regular',
            hoursRequirement: 50,
            hoursLDC: true
        });

        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.updateProfile({
                name: newName,
                surname: newSurname,
                precursor: 'regular',
                hoursRequirement: 50,
                hoursLDC: true
            });
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...authenticateStateMock,
            user: {
                ...authenticateStateMock.user,
                name: newName,
                surname: newSurname,
                precursor: 'regular',
                hoursRequirement: 50,
                hoursLDC: true
            }
        });
    });

    it('should faild if user is unauthenticated', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(() => {
            result.current.useAuth.clearAuth();
        });

        await act(async () => {
            await result.current.useAuth.updateProfile({
                name: 'AnyName',
                surname: 'AnySurname',
                precursor: 'regular',
                hoursRequirement: 50,
                hoursLDC: true
            });
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
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });
});