import React from 'react';
import { renderHook } from '@testing-library/react-native';

/* Theme */
import { ThemeProvider, useTheme } from '@theme';

export const renderUseTheme = () => renderHook(
    () => useTheme(),
    { wrapper: ({ children }) => <ThemeProvider>{ children }</ThemeProvider> }
);