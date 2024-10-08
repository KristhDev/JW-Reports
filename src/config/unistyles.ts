import { UnistylesRegistry } from 'react-native-unistyles';

/* Theme */
import { AppBreakpoints, AppThemes, breakpoints, darkTheme, lightTheme } from '@theme';

declare module 'react-native-unistyles' {
    export interface UnistylesBreakpoints extends AppBreakpoints {}
    export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry
    .addBreakpoints(breakpoints)
    .addThemes({
        dark: darkTheme,
        light: lightTheme
    })
    .addConfig({
        adaptiveThemes: true
    });