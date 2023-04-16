import { Colors } from '../interfaces/theme';

/* Exporting the object `lightColors` as a constant. */
export const lightColors: Colors = {
    background: '#F1F1F1',
    bottom: '#D8D8D8',
    button: '#5A3D86',
    buttonDark: '#3B2758',
    card: '#F1F1F1',
    contentHeader: '#FFFFFF',
    focus: '#D8981A',
    header: '#D8D8D8',
    headerText: '#1C1C1C',
    icon: '#4F4F4F',
    inputText: '#4A4A4A',
    linkText: '#496DA7',
    modal: '#F1F1F1',
    modalText: '#000000',
    navbar: '#FFFFFF',
    text: '#000000',
    titleSecondary: '#5A7475',
    titleText: '#292929',
}

/* Exporting the object `darkColors` as a constant. */
export const darkColors: Colors = {
    background: '#000000',
    bottom: '#292929',
    button: '#C0A7E1',
    buttonDark: '#9C85B9',
    card: '#292929',
    contentHeader: '#121212',
    focus: '#D8981A',
    header: '#292929',
    headerText: '#FFFFFF',
    icon: '#BFBFBF',
    inputText: '#FFFFFF',
    linkText: '#A0B9E2',
    modal: '#292929',
    modalText: '#B4B4B4',
    navbar: '#000000',
    text: '#FFFFFF',
    titleSecondary: '#93A8AB',
    titleText: '#FFFFFF',
}

/* A fallback for when the theme is not defined. */
export const undefinedColors: Colors = {
    background: 'transparent',
    bottom: 'transparent',
    button: 'transparent',
    buttonDark: 'transparent',
    card: 'transparent',
    contentHeader: 'transparent',
    focus: 'transparent',
    header: 'transparent',
    headerText: 'transparent',
    icon: 'transparent',
    inputText: 'transparent',
    linkText: 'transparent',
    modal: 'transparent',
    modalText: 'transparent',
    navbar: 'transparent',
    text: 'transparent',
    titleSecondary: 'transparent',
    titleText: 'transparent',
}