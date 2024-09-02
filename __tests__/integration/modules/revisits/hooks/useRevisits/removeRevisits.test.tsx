import { act } from '@testing-library/react-native';

/* Setups */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseRevisits, renderUseRevisits } from '@setups';

/* Mocks */
import { initialAuthStateMock, initialStatusStateMock, revisitsStateMock, wifiMock } from '@mocks';

describe('Test useRevisits hook - removeRevisits', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    let mockStore = {} as any;

    beforeEach(() => {
        mockStore = getMockStoreUseRevisits({
            auth: initialAuthStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });
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