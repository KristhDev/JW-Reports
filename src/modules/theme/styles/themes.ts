import { darkColors, lightColors } from './colors';
import { fontSizes } from './font-sizes';
import { margins } from './margins';

export const lightTheme = {
    colors: lightColors,
    fontSizes,
    margins
} as const;

export const darkTheme = {
    colors: darkColors,
    fontSizes,
    margins
} as const;