import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork, useTheme } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { initialAuthStateMock, initialStatusStateMock, revisitsStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useTheme.ts')

describe('Test useRevisits hook removeRevisits', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should remove revisits of state', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, revisits: revisitsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        /* Check if revisits contain a value */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsStateMock,
            selectedRevisit: {
                ...revisitsStateMock.selectedRevisit,
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        await act(async () => {
            result.current.useRevisits.removeRevisits();
        });

        /* Check if revisits is empty array */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsStateMock,
            revisits: [],
            selectedRevisit: {
                ...revisitsStateMock.selectedRevisit,
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(result.current.useRevisits.state.revisits).toHaveLength(0);
    });
});