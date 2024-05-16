import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseRevisits, renderUseRevisits } from '../../../../../setups';

/* Mocks */
import { initialAuthStateMock, initialStatusStateMock, revisitsStateMock, wifiMock } from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseRevisits({
    auth: initialAuthStateMock,
    revisits: revisitsStateMock,
    status: initialStatusStateMock
});

describe('Test useRevisits hook - removeRevisits', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should remove revisits of state', async () => {
        const { result } = renderUseRevisits(mockStore);

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