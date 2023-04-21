import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState, authenticateState, testCredentials } from '../../features/auth';
import { coursesState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';
import { preachingsState } from '../../features/preaching';
import { revisitsState } from '../../features/revisits';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStoreComplete, renderComplete } from './setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test in useAuth hook signOut', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

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

        /* Check if state is equal to initial state */
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

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...authenticateState,
            isAuthenticated: false
        });

        await result.current.useAuth.signOut();
    });
});