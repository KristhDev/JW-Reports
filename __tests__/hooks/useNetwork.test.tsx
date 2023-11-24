import React from 'react';
import { renderHook } from '@testing-library/react-native';

/* Context */
import { INIT_WIFI_STATE, NetworkProvider } from '../../src/context';

/* Hooks */
import { useNetwork } from '../../src/hooks';

describe('Test in useNetwork hook', () => {
    it('shoud return respective properties', async () => {
        const { result } = renderHook(() => useNetwork(), {
            wrapper: ({ children }) => <NetworkProvider>{ children }</NetworkProvider>
        });

        expect(result.current).toEqual({ wifi: INIT_WIFI_STATE });
    });
});