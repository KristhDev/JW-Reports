import { Colors, Theme, ThemeState } from '../../interfaces/theme';

type ThemeAction =
    | { type: '[Theme] set theme', payload: { theme: Theme } }
    | { type: '[Theme] set colors', payload: { colors: Colors } }
    | { type: '[Theme] set selected theme', payload: { selectedTheme: Theme } }
    | { type: '[Theme] set is loaded theme', payload: { isLoaded: boolean } }
    | { type: '[Theme] set device theme', payload: { theme: Theme } }

/**
 * This reducer is used to manage the theme state.
 * @param {ThemeState} state - ThemeState - the current state of the reducer
 * @param {ThemeAction} action - ThemeAction
 * @returns The state is being returned.
 */
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

        case '[Theme] set is loaded theme':
            return {
                ...state,
                isLoadedTheme: action.payload.isLoaded
            }

        case '[Theme] set device theme':
            return {
                ...state,
                deviceTheme: action.payload.theme
            }

        default:
            return state;
    }
}

export default themeReducer;