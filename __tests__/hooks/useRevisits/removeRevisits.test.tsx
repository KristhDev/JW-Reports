import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { revisitsState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

import { useTheme } from '../../../src/hooks';

import { getMockStore, render } from './setup';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useTheme.ts')

describe('Test useRevisits hook removeRevisits', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should remove revisits of state', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsState, status: statusInitState });
        const { result } = render(mockStore);

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