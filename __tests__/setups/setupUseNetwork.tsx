import React from 'react';
import { renderHook } from '@testing-library/react-native';

import { NetworkProvider, useNetwork } from '../../src/modules/shared';

export const renderUseNetwork = () => renderHook(
    () => useNetwork(),
    { wrapper: ({ children }) => <NetworkProvider>{ children }</NetworkProvider> }
);