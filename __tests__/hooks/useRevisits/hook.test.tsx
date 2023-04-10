
/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as revisitsInitState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts')

describe('Test useRevisits hook', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should return respective props', () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        /* Check if the hook return respective properties */
        expect(result.current.useRevisits).toEqual({
            state: revisitsInitState,
            clearRevisits: expect.any(Function),
            removeRevisits: expect.any(Function),
            setRefreshRevisits: expect.any(Function),
            setRevisitsPagination: expect.any(Function),
            setRevisitsScreenHistory: expect.any(Function),
            setSelectedRevisit: expect.any(Function),
            deleteRevisit: expect.any(Function),
            loadRevisits: expect.any(Function),
            saveRevisit: expect.any(Function),
            updateRevisit: expect.any(Function),
            completeRevisit: expect.any(Function)
        });
    });
});