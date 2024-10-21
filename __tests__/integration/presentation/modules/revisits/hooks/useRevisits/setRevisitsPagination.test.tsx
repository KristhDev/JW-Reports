import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseRevisits, renderUseRevisits } from '@setups';

/* Mocks */
import { hasWifiConnectionMock, initialAuthStateMock, initialRevisitsStateMock, initialStatusStateMock, wifiMock } from '@mocks';

describe('Test useRevisits hook - setRevisitsPagination', () => {
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
            result.current.useRevisits.setRevisitsPagination({
                from: 10,
                to: 19
            });
        });

        /* Check if revisitsPagination is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisitsPagination: {
                from: 10,
                to: 19
            }
        });

        await act(async () => {
            result.current.useRevisits.setRevisitsPagination({
                from: 0,
                to: 9
            });
        });

        /* Check if revisitsPagination is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisitsPagination: {
                from: 0,
                to: 9
            }
        });
    });
});