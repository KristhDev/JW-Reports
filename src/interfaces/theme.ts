export type Theme = 'dark' | 'light' | 'default';

export interface ThemeState {
    colors: Colors;
    deviceTheme: Theme;
    isLoadedTheme: boolean;
    selectedTheme: Theme,
    theme: Theme,
}

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
    text: string;
    titleSecondary: string;
    titleText: string;
}

export type SetThemePayload = {
    theme: Theme
}