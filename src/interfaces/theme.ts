export type Theme = 'dark' | 'light';

export interface ThemeState {
    theme: Theme,
    colors: Colors
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
    titleText: string;
}

export type SetThemePayload = {
    theme: Theme
}