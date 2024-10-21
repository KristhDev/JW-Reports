import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseRevisits, renderUseRevisits } from '@setups';

/* Mocks */
import { initialAuthStateMock, initialRevisitsStateMock, initialStatusStateMock, wifiMock } from '@mocks';

describe('Test useRevisits hook - setRefreshRevisits', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

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