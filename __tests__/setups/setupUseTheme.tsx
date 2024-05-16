import React from 'react';
import { renderHook } from '@testing-library/react-native';

/* Theme */
import { ThemeProvider, useTheme } from '../../src/modules/theme';

export const renderUseTheme = () => renderHook(
    () => useTheme(),
    { wrapper: ({ children }) => <ThemeProvider>{ children }</ThemeProvider> }
);