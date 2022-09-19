import { SetThemePayload, ThemeState } from '../../interfaces/theme';

import { darkColors, lightColors } from '../colors';

type ThemeAction =
    | { type: '[Theme] set_theme', payload: SetThemePayload }

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case '[Theme] set_theme':
            return {
                ...state,
                theme: action.payload.theme,
                colors: (action.payload.theme === 'dark') ? darkColors : lightColors
            }

        default:
            return state;
    }
}

export default themeReducer;