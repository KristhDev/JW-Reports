export type Theme = 'dark' | 'light' | 'default';

/* Defining the interface for the ThemeState. */
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

/**
 * SetThemePayload is an object with a property called theme that is of type Theme
 * @property {Theme} theme - The theme to set.
 */
export type SetThemePayload = {
    theme: Theme
}