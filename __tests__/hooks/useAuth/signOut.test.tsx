import { act } from '@testing-library/react-native';

import { initialState as authInitState, authenticateState, testCredentials } from '../../features/auth';
import { coursesState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';
import { preachingsState } from '../../features/preaching';
import { revisitsState } from '../../features/revisits';

import { getMockStoreComplete, renderComplete } from './setup';

describe('Test in useAuth hook signOut', () => {
    it('should close session', async () => {
        const mockStore = getMockStoreComplete({
            auth: authInitState,
            courses: coursesState,
            preaching: preachingsState,
            revisits: revisitsState,
            status: statusInitState
        });

        const { result } = renderComplete(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });

        expect(result.current.useAuth.state).toEqual({
            ...authInitState,
            user: {
                ...authInitState.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });

    it('should fail when isAutheticated is false', async () => {
        const mockStore = getMockStoreComplete({
            auth: {
                ...authenticateState,
                isAuthenticated: false
            },
            courses: coursesState,
            preaching: preachingsState,
            revisits: revisitsState,
            status: statusInitState
        });

        const { result } = renderComplete(mockStore);

        await act(async () => {
            await result.current.useAuth.signOut();
        });

        expect(result.current.useAuth.state).toEqual({
            ...authenticateState,
            isAuthenticated: false
        });

        await result.current.useAuth.signOut();
    });
});