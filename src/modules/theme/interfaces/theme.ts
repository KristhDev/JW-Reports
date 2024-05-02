export type Theme = 'dark' | 'light' | 'default';

/**
 * Defining the interface for the ThemeState.
 *
 * @property {Colors} colors - The colors object.
 * @property {Theme} deviceTheme - The device of theme.
 * @property {boolean} isLoadedTheme - Whether the theme has been loaded.
 * @property {Theme} selectedTheme - The selected theme of app.
 * @property {Theme} theme - The theme.
 */
export interface ThemeState {
    colors: Colors;
    deviceTheme: Theme;
    isLoadedTheme: boolean;
    selectedTheme: Theme,
    theme: Theme,
}

/* Defining the interface for the Colors object. */
export interface Colors {
    background: string;
    bottom: string;
    button: string;
    buttonDark: string;
    card: string;
    contentHeader: string;
    focus: string;
    header: string;
    headerText: string;
    icon: string;
    inputText: string;
    linkText: string;
    modal: string;
    modalText: string;
    navbar: string;
    text: string;
    titleSecondary: string;
    titleText: string;
}

/* Defining the interface for the context. */
export interface ThemeContextProps {
    state: ThemeState;
    setTheme: (theme: Theme) => void;
    setDefaultTheme: () => void;
}

/**
 * SetThemePayload is an object with a property called theme that is of type Theme.
 *
 * @property {Theme} theme - The theme to set.
 */
export type SetThemePayload = {
    theme: Theme
}