import React, { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Appearance } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Context */
import ThemeContext from './ThemeContext';
import themeReducer from './themeReducer';

/* Theme - Colors */
import { darkColors, lightColors, undefinedColors } from '../colors';

/* Interfaces */
import { Theme, ThemeState } from '../../interfaces/theme';

/* Initial state */
const INITIAL_STATE: ThemeState = {
    colors: undefinedColors,
    deviceTheme: 'default',
    isLoadedTheme: false,
    selectedTheme: 'default',
    theme: 'default'
}

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ state, dispatch ] = useReducer(themeReducer, INITIAL_STATE);

    /**
     * This function sets the theme, and then sets the selected theme, and then sets the colors, and
     * then sets the isLoaded theme.
     * @param {Theme} theme - Theme - this is the theme that the user has selected.
     */
    const setTheme = async (theme: Theme) => {
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
    }

    /**
     * SetDefaultTheme is a function that sets the theme to default.
     */
    const setDefaultTheme = () => {
        setTheme('default');
    }

    /**
     * Effect to get of async storage the theme.
     */
    useEffect(() => {
        AsyncStorage.getItem('jw-reports-theme').then(theme => {
            setTheme(theme as Theme || 'default');
        });
    }, []);

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

    return (
        <>
            {
                (state.isLoadedTheme) && (
                    <ThemeContext.Provider
                        value={{
                            state,
                            setTheme,
                            setDefaultTheme
                        }}
                    >
                        { children }
                    </ThemeContext.Provider>
                )
            }
        </>
    );
}

export default ThemeProvider;