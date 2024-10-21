import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseRevisits, renderUseRevisits } from '@setups';

/* Mocks */
import {
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    wifiMock
} from '@mocks';

describe('Test useRevisits hook - setRevisitsScreenHistory', () => {
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
            result.current.useRevisits.setRevisitsScreenHistory('AllRevisitsScreen');
        });

        /* Check if revisitsScreeenHistory is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisitsScreenHistory: [ 'AllRevisitsScreen' ]
        });

        await act(async () => {
            result.current.useRevisits.setRevisitsScreenHistory('VisitRevisistsScreen');
        });

        /* Check if revisitsScreeenHistory is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisitsScreenHistory: [ 'AllRevisitsScreen', 'VisitRevisistsScreen' ]
        });
    });
});