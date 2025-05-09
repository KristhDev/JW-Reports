import { Theme } from '@application/context';

export const themes: Record<Uppercase<Theme | 'default'>, Theme | 'default'> = {
    DARK: 'dark',
    DEFAULT: 'default',
    LIGHT: 'light'
}