import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { initialState as revisitsInitState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

import { useTheme } from '../../../src/hooks';

import { getMockStore, render } from './setup';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useTheme.ts')

describe('Test useRevisits hook setRefreshRevisits', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useRevisits.setRefreshRevisits(true);
        });

        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            refreshRevisits: true
        });

        await act(async () => {
            await result.current.useRevisits.setRefreshRevisits(false);
        });

        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            refreshRevisits: false
        });
    });
});