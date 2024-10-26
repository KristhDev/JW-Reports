import { ThemeState } from '@application/context';
import * as useTheme from '@theme/hooks/useTheme';

export const useThemeSpy = jest.spyOn(useTheme, 'default');

export const setThemeMock = jest.fn();

export const lightState: ThemeState = {
    theme: 'light',
    selectedTheme: 'light',
}

export const darkState: ThemeState = {
    theme: 'dark',
    selectedTheme: 'dark',
}
