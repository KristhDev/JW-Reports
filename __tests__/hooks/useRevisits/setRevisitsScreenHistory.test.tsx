import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
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

describe('Test useRevisits hook setRevisitsScreenHistory', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useRevisits.setRevisitsScreenHistory('AllRevisitsScreen');
        });

        /* Check if revisitsScreeenHistory is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            revisitsScreenHistory: [ 'AllRevisitsScreen' ]
        });

        await act(async () => {
            await result.current.useRevisits.setRevisitsScreenHistory('VisitRevisistsScreen');
        });

        /* Check if revisitsScreeenHistory is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            revisitsScreenHistory: [ 'AllRevisitsScreen', 'VisitRevisistsScreen' ]
        });
    });
});