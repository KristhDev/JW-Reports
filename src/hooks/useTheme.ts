import { Appearance } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../features/store';

import { setTheme as setThemeAction } from '../features/theme';

import { ThemeState, Theme } from '../interfaces/theme';

const useTheme = () => {
    const dispatch = useAppDispatch();
    const state = useSelector<RootState, ThemeState>(store => store.theme);

    const setTheme = (theme: Theme) => dispatch(setThemeAction({ theme }));

    const setDefaultTheme = () => {
        const theme = Appearance.getColorScheme();
        setTheme(theme ?? 'light');
    }

    return {
        state,
        setTheme,
        setDefaultTheme
    }
}

export default useTheme;