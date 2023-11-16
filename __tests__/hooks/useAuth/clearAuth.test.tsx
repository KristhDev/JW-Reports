import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { authenticateStateMock, initialAuthStateMock, initialStatusStateMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test in useAuth hook clearAuth', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    it('should clean authentication', async () => {
        const mockStore = getMockStore({ auth: authenticateStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual(authenticateStateMock);

        await act(async () => {
            result.current.useAuth.clearAuth();
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
    });
});