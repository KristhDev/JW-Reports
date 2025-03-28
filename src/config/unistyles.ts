import { UnistylesRegistry } from 'react-native-unistyles';

/* Theme */
import { breakpoints, darkTheme, lightTheme } from '@theme/styles';
import { AppBreakpoints, AppThemes } from '@theme/interfaces';

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