import { Colors, Theme, ThemeState } from '../../interfaces/theme';

type ThemeAction =
    | { type: '[Theme] set theme', payload: { theme: Theme } }
    | { type: '[Theme] set colors', payload: { colors: Colors } }
    | { type: '[Theme] set selected theme', payload: { selectedTheme: Theme } }

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case '[Theme] set theme':
            return {
                ...state,
                theme: action.payload.theme
            }

        case '[Theme] set colors':
            return {
                ...state,
                colors: action.payload.colors
            }

        case '[Theme] set selected theme':
            return {
                ...state,
                selectedTheme: action.payload.selectedTheme
            }

        default:
            return state;
    }
}

export default themeReducer;