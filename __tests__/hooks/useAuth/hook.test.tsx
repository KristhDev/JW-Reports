/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test in useAuth hook', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return respective props', () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.useAuth).toEqual({
            state: initialAuthStateMock,
            clearAuth: expect.any(Function),
            renew: expect.any(Function),
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