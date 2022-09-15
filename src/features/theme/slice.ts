import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { lightColors, darkColors } from '../../theme/colors';

import { ThemeState, SetThemePayload } from '../../interfaces/theme';

const INITIAL_STATE: ThemeState = {
    theme: 'light',
    colors: lightColors
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: INITIAL_STATE,
    reducers: {
        setTheme: (state, action: PayloadAction<SetThemePayload>) => {
            state.theme = action.payload.theme;
            state.colors = (action.payload.theme === 'light') ? lightColors : darkColors;
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;