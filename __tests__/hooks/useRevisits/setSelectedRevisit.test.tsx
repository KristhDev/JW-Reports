import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { revisits, initialState as revisitsInitState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts')

describe('Test useRevisits hook setSelectedRevisit', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        /* Check if revisits state is equal to initial state */
        expect(result.current.useRevisits.state).toEqual(revisitsInitState);

        await act(async () => {
            await result.current.useRevisits.setSelectedRevisit(revisits[0]);
        });

        /* Check if selectedRevisit is changed */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            selectedRevisit: revisits[0]
        });
    });
});