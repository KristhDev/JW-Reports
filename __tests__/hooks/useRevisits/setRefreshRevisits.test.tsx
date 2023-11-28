import { act } from '@testing-library/react-native';

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
jest.mock('../../../src/hooks/useTheme.ts')

describe('Test useRevisits hook setRefreshRevisits', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, revisits: initialRevisitsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            result.current.useRevisits.setRefreshRevisits(true);
        });

        /* Check if refreshRevisits is changed */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            refreshRevisits: true
        });

        await act(async () => {
            result.current.useRevisits.setRefreshRevisits(false);
        });

        /* Check if refreshRevisits is changed */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            refreshRevisits: false
        });
    });
});