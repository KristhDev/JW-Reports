import { darkColors, lightColors } from './colors';
import { margins } from './margins';

export const lightTheme = {
    colors: lightColors,
    margins
} as const;

export const darkTheme = {
    colors: darkColors,
    margins
} as const;