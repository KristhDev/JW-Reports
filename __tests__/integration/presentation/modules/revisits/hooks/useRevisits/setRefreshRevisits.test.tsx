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

describe('Test useRevisits hook - setRefreshRevisits', () => {
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

    it('should change respective property', async () => {
        const { result } = renderUseRevisits(mockStore);

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