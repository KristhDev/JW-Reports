import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState, authenticateState } from '../../features/auth';
import { initialState as statusInitState } from '../../features/status';

/* Setup */
import { getMockStore, render } from './setup';

describe('Test in useAuth hook clearAuth', () => {
    it('should clean authentication', async () => {
        const mockStore = getMockStore({ auth: authenticateState, status: statusInitState });
        const { result } = render(mockStore);

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateState);

        await act(async () => {
            await result.current.useAuth.clearAuth();
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
});