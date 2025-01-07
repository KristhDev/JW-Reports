import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseRevisits, renderUseRevisits } from '@setups';

/* Mocks */
import {
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

describe('Test useRevisits hook - clearRevisits', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        mockStore = getMockStoreUseRevisits({
            auth: initialAuthStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should clear state of revisits', async () => {
        const { result } = renderUseRevisits(mockStore);

        /* Check is revisits state containt revisits values */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            selectedRevisit: {
                ...initialRevisitsStateMock.selectedRevisit,
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        await act(async () => {
            result.current.useRevisits.clearRevisits();
        });

        /* Check if revisits state is cleanen */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            selectedRevisit: {
                ...initialRevisitsStateMock.selectedRevisit,
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });
});