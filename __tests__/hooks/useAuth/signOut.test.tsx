import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStoreComplete, renderComplete } from './setup';

/* Mocks */
import {
    coursesStateMock,
    initialAuthStateMock,
    initialStatusStateMock,
    preachingsStateMock,
    revisitsStateMock,
    testCredentials,
    wifiMock
} from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test in useAuth hook signOut', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should close session', async () => {
        const mockStore = getMockStoreComplete({
            auth: initialAuthStateMock,
            courses: coursesStateMock,
            preaching: preachingsStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
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
            ...initialAuthStateMock,
            user: {
                ...initialAuthStateMock.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });

    it('should fail when isAutheticated is false', async () => {
        const mockStore = getMockStoreComplete({
            auth: {
                ...initialAuthStateMock,
                isAuthenticated: false
            },
            courses: coursesStateMock,
            preaching: preachingsStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderComplete(mockStore);

        await act(async () => {
            await result.current.useAuth.signOut();
        });

        /* Check if state is equal to authenticated state */
        expect(result.current.useAuth.state).toEqual({
            ...initialAuthStateMock,
            isAuthenticated: false
        });

        await result.current.useAuth.signOut();
    });
});