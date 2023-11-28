/* Hooks */
import { useNetwork, useTheme } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { initialAuthStateMock, initialRevisitsStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test useRevisits hook', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should return respective props', () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, revisits: initialRevisitsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        /* Check if the hook return respective properties */
        expect(result.current.useRevisits).toEqual({
            state: initialRevisitsStateMock,

            clearRevisits: expect.any(Function),
            removeRevisits: expect.any(Function),
            setRefreshRevisits: expect.any(Function),
            setRevisitsPagination: expect.any(Function),
            setRevisitsScreenHistory: expect.any(Function),
            setSelectedRevisit: expect.any(Function),

            completeRevisit: expect.any(Function),
            deleteRevisit: expect.any(Function),
            loadLastRevisit: expect.any(Function),
            loadRevisits: expect.any(Function),
            saveRevisit: expect.any(Function),
            updateRevisit: expect.any(Function),
        });
    });
});