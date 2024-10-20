export type Theme = 'dark' | 'light';

/**
 * Defining the interface for the ThemeState.
 *
 * @property {Theme} selectedTheme - The selected theme of app.
 * @property {Theme} theme - The theme.
 */
export interface ThemeState {
    theme: Theme;
    selectedTheme: Theme | 'default';
}

/* Defining the interface for the context. */
export interface ThemeContextProps {
    state: ThemeState;
    setTheme: (theme: Theme | 'default') => Promise<void>;
}

/**
 * SetThemePayload is an object with a property called theme that is of type Theme.
 *
 * @property {Theme} theme - The theme to set.
 */
export type SetThemePayload = {
    theme: Theme
}