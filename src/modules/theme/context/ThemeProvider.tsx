import React, { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
import SystemNavigationBar from 'react-native-system-navigation-bar';

/* Context */
import { ThemeContext } from './';

/* Interfaces */
import { Theme } from '../interfaces';

/* Utils */
import { storage, storageKeys } from '../../../utils';

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

    /**
     * Sets the theme for the application.
     *
     * @param {Theme | 'default'} theme - The theme to set. If 'default', the theme will be set based on the color scheme.
     * @return {Promise<void>} - A promise that resolves when the theme is set.
     */
    const setTheme = async (theme: Theme | 'default'): Promise<void> => {
        let userTheme = theme;
        if (userTheme === 'default') userTheme = UnistylesRuntime.colorScheme as any;

        UnistylesRuntime.setTheme(userTheme as Theme);
        setThemeState(userTheme as Theme);
        setSelectedTheme(theme);

        storage.setItem(storageKeys.THEME, theme);
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
        const theme = storage.getItem(storageKeys.THEME);
        setTheme(theme as Theme || 'default');
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
