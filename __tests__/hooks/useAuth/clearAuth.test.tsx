import { act } from '@testing-library/react-native';

import { initialState as authInitState, authenticateState } from '../../features/auth';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test in useAuth hook clearAuth', () => {
    it('should clean authentication', async () => {
        const mockStore = getMockStore({ auth: authenticateState, status: statusInitState });
        const { result } = render(mockStore);

        expect(result.current.useAuth.state).toEqual(authenticateState);

        await act(async () => {
            await result.current.useAuth.clearAuth();
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
});