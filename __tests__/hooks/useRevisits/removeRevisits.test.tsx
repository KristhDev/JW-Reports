import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { revisitsState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork, useTheme } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useTheme.ts')

describe('Test useRevisits hook removeRevisits', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should remove revisits of state', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsState, status: statusInitState });
        const { result } = render(mockStore);

        /* Check if revisits contain a value */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsState,
            selectedRevisit: {
                ...revisitsState.selectedRevisit,
                next_visit: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        await act(async () => {
            await result.current.useRevisits.removeRevisits();
        });

        /* Check if revisits is empty array */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsState,
            revisits: [],
            selectedRevisit: {
                ...revisitsState.selectedRevisit,
                next_visit: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        expect(result.current.useRevisits.state.revisits).toHaveLength(0);
    });
});