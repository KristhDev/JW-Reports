import { act } from '@testing-library/react-native';

/* Setup */
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
    testCredentials,
    wifiMock
} from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseAuth({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    preaching: initialPreachingStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
});

describe('Test in useAuth hook - updateProfile', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should update user info', async () => {
        const { result } = renderUseAuth(mockStore);

        const newName = 'Gerard';
        const newSurname = 'Orn';

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateProfile({
                name: newName,
                surname: newSurname,
                precursor: 'regular',
                hoursRequirement: 50
            });
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...authenticateStateMock,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: newName,
                surname: newSurname,
                email: testCredentials.email,
                precursor: 'regular',
                hoursRequirement: 50,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        await act(async () => {
            await result.current.useAuth.updateProfile({ name: 'André', surname: 'Rivera', precursor: 'ninguno', hoursRequirement: 0 });
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user is unauthenticated', async () => {
        const { result } = renderUseAuth(mockStore);

        await act(async () => {
            await result.current.useAuth.updateProfile({
                name: 'AnyName',
                surname: 'AnySurname',
                precursor: 'regular',
                hoursRequirement: 50
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
            code: 400,
            msg: expect.any(String)
        });
    });
});