import { act } from '@testing-library/react-native';

import { initialState as authInitState, authenticateState, testCredentials } from '../../features/auth';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test in useAuth hook updateProfile', () => {
    it('should update user info', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        const newName = 'Gerard';
        const newSurname = 'Orn';

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.updateProfile({ name: newName, surname: newSurname, precursor: 'regular' });
        });

        expect(result.current.useAuth.state).toEqual({
            ...authenticateState,
            token: expect.any(String),
            user: {
                id: expect.any(String),
                name: newName,
                surname: newSurname,
                email: testCredentials.email,
                precursor: 'regular',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        await act(async () => {
            await result.current.useAuth.updateProfile({ name: 'André', surname: 'Rivera', precursor: 'ninguno' });
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user is unauthenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.updateProfile({ name: 'AnyName', surname: 'AnySurname', precursor: 'regular' });
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            user: {
                ...authInitState.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });
});