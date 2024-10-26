import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUsePreaching, renderUsePreaching } from '@setups';

/* Mocks */
import {
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialPreachingStateMock,
    initialStatusStateMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

describe('Test usePreaching hook - setIsPreachingsLoading', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        mockStore = getMockStoreUsePreaching({
            auth: initialAuthStateMock,
            preaching: initialPreachingStateMock,
            status: initialStatusStateMock
        });
    });

    it('should change respective property', async () => {
        const { result } = renderUsePreaching(mockStore);

        await act(() => {
            result.current.usePreaching.setIsPreachingsLoading(true);
        });

        /* Check if isPreaching is changed */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            isPreachingsLoading: true
        });

        await act(() => {
            result.current.usePreaching.setIsPreachingsLoading(false);
        });

        /* Check if isPreaching is changed */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            isPreachingsLoading: false
        });
    });
});