import React, { FC, PropsWithChildren, useCallback, useEffect, useMemo, useReducer } from 'react';
import { Appearance } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Context */
import { ThemeContext, themeReducer } from './';

/* Theme - Colors */
import { darkColors, lightColors, undefinedColors } from '../styles';

/* Interfaces */
import { Theme, ThemeState } from '../interfaces';

/* Initial state */
export const THEME_INITIAL_STATE: ThemeState = {
    colors: undefinedColors,
    deviceTheme: 'default',
    isLoadedTheme: false,
    selectedTheme: 'default',
    theme: 'default'
}

/**
 * A function that sets the theme, and then sets the selected theme, and then sets the colors, and
 * then sets the isLoaded theme.
 *
 * @param {Theme} theme - Theme - this is the theme that the user has selected.
 * @return {Promise<void>} This function does not return anything.
 */
const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ state, dispatch ] = useReducer(themeReducer, THEME_INITIAL_STATE);

    /**
     * This function sets the theme, and then sets the selected theme, and then sets the colors, and
     * then sets the isLoaded theme.
     *
     * @param {Theme} theme - Theme - this is the theme that the user has selected.
     * @return {Promise<void>} This function does not return anything.
     */
    const setTheme = useCallback(async (theme: Theme): Promise<void> => {
        dispatch({ type: '[Theme] set theme', payload: { theme } });
        await AsyncStorage.setItem('jw-reports-theme', theme);

        dispatch({
            type: '[Theme] set selected theme',
            payload: {
                selectedTheme: (theme === 'default')
                    ? (Appearance.getColorScheme() || 'light')
                    : theme
            }
        });

        if (theme === 'default') theme = Appearance.getColorScheme() || 'light';

        dispatch({
            type: '[Theme] set colors',
            payload: {
                colors: (theme === 'light') ? lightColors : darkColors
            }
        });

        dispatch({
            type: '[Theme] set is loaded theme',
            payload: {
                isLoaded: true
            }
        });
    }, []);

    /**
     * SetDefaultTheme is a function that sets the theme to default.
     *
     * @return This function does not return anything.
     */
    const setDefaultTheme = useCallback((): void => {
        setTheme('default');
    }, []);

    /**
     * Effect to get of async storage the theme.
     */
    useEffect(() => {
        AsyncStorage.getItem('jw-reports-theme').then(theme => {
            setTheme(theme as Theme || 'default');
        });
    }, []);

    const store = useMemo(() => ({
        state,
        setTheme,
        setDefaultTheme
    }), [ state ])

    /**
     * Effect for listening to the theme changes with object Appearance.
     */
    useEffect(() => {
        const unSubscribeTheme = Appearance.addChangeListener(({ colorScheme }) => {
            dispatch({
                type: '[Theme] set device theme',
                payload: {
                    theme: colorScheme || 'light',
                }
            });
        });

        return () => {
            unSubscribeTheme.remove();
        }
    }, []);

    /**
     * Effect to set default theme then change device thene.
     */
    useEffect(() => {
        if (state.theme === 'default' && state.isLoadedTheme) {
            setDefaultTheme();
        }
    }, [ state.deviceTheme ]);

    /**
     * Effect to change navigation color when change
     * selected theme and colors
     */
    useEffect(() => {
        if (state.isLoadedTheme) {
            SystemNavigationBar.setNavigationColor(
                state.colors.navbar,
                (state.selectedTheme === 'dark') ? 'light' : 'dark',
                'navigation'
            );
        }
    }, [ state.isLoadedTheme, state.selectedTheme, state.colors ]);

    if (!state.isLoadedTheme) return <></>;

    return (
        <ThemeContext.Provider value={ store }>
            { children }
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
