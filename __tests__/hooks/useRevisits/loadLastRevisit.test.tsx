import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork, useTheme } from '../../../src/hooks';

/* Hooks */
import { getMockStore, onFinishMock, render } from './setup';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { initialAuthStateMock, initialRevisitsStateMock, initialStatusStateMock, testCredentials, testRevisit, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test useRevisits hook loadLastRevisit', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should load last revisit successfully', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, revisits: initialRevisitsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                onFinish: onFinishMock,
                revisitValues: testRevisit
            });
        });

        await act(() => {
            result.current.useRevisits.removeRevisits();
        });

        await act(async () => {
            await result.current.useRevisits.loadLastRevisit();
        });

        /* Check if revisits state not contain revisit deleted */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            selectedRevisit: {
                ...initialRevisitsStateMock.selectedRevisit,
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            revisits: [],
            lastRevisit: {
                id: expect.any(String),
                userId: expect.any(String),
                ...testRevisit,
                photo: null,
                nextVisit: expect.any(String),
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        await act(() => {
            result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.lastRevisit);
        });

        await act(async () => {
            await result.current.useRevisits.deleteRevisit(false, onFinishMock);
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticated', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, revisits: initialRevisitsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useRevisits.loadLastRevisit();
        });

        /* Check if revisits state is equal to initial state */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });
});