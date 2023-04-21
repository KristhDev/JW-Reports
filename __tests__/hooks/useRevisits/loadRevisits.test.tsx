import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as revisitsInitState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork, useTheme } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in useRevisits hook loadRevisits', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should load revisits successfully', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.loadRevisits({ filter: 'all' });
        });

        /* Check if hasMoreRevisits is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            hasMoreRevisits: false
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useRevisits.loadRevisits({ filter: 'visited' });
        });

        /* Check if revisitFilter is changed */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            revisitFilter: 'visited'
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });
});