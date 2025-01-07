import React from 'react';
import { renderHook } from '@testing-library/react-native';

/* Context */
import { NetworkProvider } from '@application/context';

/* Hooks */
import { useNetwork } from '@shared';

export const renderUseNetwork = () => renderHook(
    () => useNetwork(),
    { wrapper: ({ children }) => <NetworkProvider>{ children }</NetworkProvider> }
);