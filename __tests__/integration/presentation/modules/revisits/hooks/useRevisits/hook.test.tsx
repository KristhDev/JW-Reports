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

describe('Test useRevisits hook', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should return respective props', () => {
        const mockStore = getMockStoreUseRevisits({
            auth: initialAuthStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseRevisits(mockStore);

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