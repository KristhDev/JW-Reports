/* Setup */
import { renderUseNetwork } from '@setups';

/* Mocks */
import { useStatusSpy } from '@mocks';

/* Constext */
import { INIT_WIFI_STATE } from '@application/context';

useStatusSpy.mockImplementation(() => ({
    setNetworkError: jest.fn()
}) as any);

describe('Test in useNetwork hook', () => {
    it('shoud return respective properties', async () => {
        const { result } = renderUseNetwork();

        expect(result.current).toEqual({
            wifi: INIT_WIFI_STATE,
            hasWifiConnection: expect.any(Function),
        });
    });
});