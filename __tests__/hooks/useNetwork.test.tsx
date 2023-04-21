import React from 'react';
import { renderHook } from '@testing-library/react-native';

/* Context */
import { NetworkProvider } from '../../src/context/network';

/* Hooks */
import { useNetwork } from '../../src/hooks';

describe('Test in useNetwork hook', () => {
    it('shoud return respective properties', () => {
        const { result } = renderHook(() => useNetwork(), {
            wrapper: ({ children }) => <NetworkProvider>{ children }</NetworkProvider>
        });

        expect(result.current).toEqual({
            isConnected: expect.any(Boolean)
        });
    });
});