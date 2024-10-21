/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUsePreaching, renderUsePreaching } from '@setups';

/* Mocks */
import { initialAuthStateMock, initialPreachingStateMock, initialStatusStateMock, wifiMock } from '@mocks';

describe('Test usePreaching hook', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    it('should return respective props', () => {
        const mockStore = getMockStoreUsePreaching({
            auth: initialAuthStateMock,
            preaching: initialPreachingStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUsePreaching(mockStore);

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching).toEqual({
            state: initialPreachingStateMock,

            clearPreaching: expect.any(Function),
            setIsPreachingsLoading: expect.any(Function),
            setSelectedDate: expect.any(Function),
            setSelectedPreaching: expect.any(Function),

            deletePreaching: expect.any(Function),
            loadPreachings: expect.any(Function),
            savePreaching: expect.any(Function),
            updatePreaching: expect.any(Function)
        });
    });
});