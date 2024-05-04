import React, { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Context */
import { ThemeContext } from './';

/* Interfaces */
import { Theme } from '../interfaces';

/**
 * A function that sets the theme, and then sets the selected theme, and then sets the colors, and
 * then sets the isLoaded theme.
 *
 * @param {Theme} theme - Theme - this is the theme that the user has selected.
 * @return {Promise<void>} This function does not return anything.
 */
const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const { theme } = useStyles();

    const [ themeState, setThemeState ] = useState<Theme>(UnistylesRuntime.themeName);
    const [ selectedTheme, setSelectedTheme ] = useState<Theme | 'default'>('default');

    const setTheme = async (theme: Theme | 'default') => {
        let userTheme = theme;
        if (userTheme === 'default') userTheme = UnistylesRuntime.colorScheme as any;

        UnistylesRuntime.setTheme(userTheme as Theme);
        setThemeState(userTheme as Theme);
        setSelectedTheme(theme);

        await AsyncStorage.setItem('jw-reports-theme', theme);
    }

    const store = useMemo(() => ({
        state: { theme: themeState, selectedTheme },
        setTheme
    }), [ theme, selectedTheme ]);

    useEffect(() => {
        const unSubscribeTheme = Appearance.addChangeListener(({ colorScheme }) => {
            if (selectedTheme === 'default') return;
            setTheme(colorScheme as Theme);
        });

        return () => {
            unSubscribeTheme.remove();
        }
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('jw-reports-theme').then(theme => {
            setTheme(theme as Theme || 'default');
        });
    }, []);

    useEffect(() => {
        SystemNavigationBar.setNavigationColor(
            theme.colors.navbar,
            (themeState === 'dark') ? 'light' : 'dark',
            'navigation'
        );
    }, [ theme ]);

    return (
        <ThemeContext.Provider value={ store }>
            { children }
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
