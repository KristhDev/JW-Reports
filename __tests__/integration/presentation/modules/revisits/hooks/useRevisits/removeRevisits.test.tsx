import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseRevisits, renderUseRevisits } from '@setups';

/* Mocks */
import {
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialStatusStateMock,
    revisitsStateMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

describe('Test useRevisits hook - removeRevisits', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

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