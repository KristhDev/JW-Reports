import { ThemeState } from '@theme';

export const setThemeMock = jest.fn();

export const lightState: ThemeState = {
    theme: 'light',
    selectedTheme: 'light',
}

export const darkState: ThemeState = {
    theme: 'dark',
    selectedTheme: 'dark',
}
