import { ThemeState } from '../../src/interfaces/theme';
import { darkColors, lightColors } from '../../src/theme';

export const lightState: ThemeState = {
    colors: lightColors,
    deviceTheme: 'light',
    isLoadedTheme: true,
    selectedTheme: 'light',
    theme: 'light'
}

export const darkState: ThemeState = {
    colors: darkColors,
    deviceTheme: 'dark',
    isLoadedTheme: true,
    selectedTheme: 'dark',
    theme: 'dark'
}

export const defaultThemeState: ThemeState = {
    colors: lightColors,
    deviceTheme: 'default',
    isLoadedTheme: true,
    selectedTheme: 'light',
    theme: 'default'
}