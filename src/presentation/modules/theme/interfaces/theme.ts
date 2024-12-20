import { breakpoints, darkTheme, lightTheme } from '../styles';

/* Defining the interface for the Colors object. */
export interface Colors {
    background: string;
    bottom: string;
    button: string;
    buttonTranslucent: string;
    buttonTransparent: string;
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
    switchThumb: string;
    switchTrack: string;
    text: string;
    titleSecondary: string;
    titleText: string;
}

/**
 * AppThemes is an object with two properties called light and dark that are of type Theme.
 */
export type AppThemes = {
    light: typeof lightTheme,
    dark: typeof darkTheme
}

/**
 * AppBreakpoints is an object with a property called breakpoints that is of type Breakpoints.
 */
export type AppBreakpoints = typeof breakpoints;