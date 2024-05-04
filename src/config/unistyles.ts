import { UnistylesRegistry } from 'react-native-unistyles';

import { AppBreakpoints, AppThemes, breakpoints, darkTheme, lightTheme } from '../modules/theme';

declare module 'react-native-unistyles' {
    export interface UnistylesBreakpoints extends AppBreakpoints {}
    export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry
    .addBreakpoints(breakpoints)
    .addThemes({
        light: lightTheme,
        dark: darkTheme,
    })
    .addConfig({
        adaptiveThemes: true
    });