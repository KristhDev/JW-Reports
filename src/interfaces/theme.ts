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
    contentHeader: string;
    header: string;
    headerText: string;
    icon: string;
    inputText: string;
    linkText: string;
    modalText: string;
    text: string;
    titleText: string;
}

export type SetThemePayload = {
    theme: Theme
}

'#292929'; '#D8D8D8';
'#121212'; '#FFFFFF';
'#282828'; '#E3E3E3';
'#000000'; '#F1F1F1';
'#C0A7E1'; '#5A3D86';
'#FFFFFF'; '#1C1C1C';
'#424242'; '#121212';
'#C9C9C9'; '#434343';
'#A2A2A2'; '#585858';
'#A0B9E2'; '#496DA7';