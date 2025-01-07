import React from 'react';
import { renderHook } from '@testing-library/react-native';

/* Context */
import { ThemeProvider } from '@application/context';

/* Theme */
import { useTheme } from '@theme';

export const renderUseTheme = () => renderHook(
    () => useTheme(),
    { wrapper: ({ children }) => <ThemeProvider>{ children }</ThemeProvider> }
);