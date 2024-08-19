import { borderRadius } from './border-radius';
import { darkColors, lightColors } from './colors';
import { fontSizes } from './font-sizes';
import { margins } from './margins';

export const lightTheme = {
    borderRadius,
    colors: lightColors,
    fontSizes,
    margins
} as const;

export const darkTheme = {
    borderRadius,
    colors: darkColors,
    fontSizes,
    margins
} as const;