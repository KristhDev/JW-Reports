/* Setup */
import { renderUseNetwork } from '@setups';

/* Modules */
import { INIT_WIFI_STATE } from '@shared';

describe('Test in useNetwork hook', () => {
    it('shoud return respective properties', async () => {
        const { result } = renderUseNetwork();

        expect(result.current).toEqual({ wifi: INIT_WIFI_STATE });
    });
});