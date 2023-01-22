import React, { FC, PropsWithChildren, useReducer, useRef } from 'react';
import { Appearance } from 'react-native';
import { Transitioning, TransitioningView, Transition } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ThemeContext from './ThemeContext';
import themeReducer from './themeReducer';

import { darkColors, lightColors } from '../colors';

import { Theme, ThemeState } from '../../interfaces/theme';

const INITIAL_STATE: ThemeState = {
    theme: 'default',
    selectedTheme: 'light',
    colors: lightColors
}

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ state, dispatch ] = useReducer(themeReducer, INITIAL_STATE);
    const ref = useRef<TransitioningView>(null);

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

        if (ref.current) ref.current.animateNextTransition();
        if (theme === 'default') theme = Appearance.getColorScheme() || 'light';

        dispatch({
            type: '[Theme] set colors',
            payload: {
                colors: (theme === 'light') ? lightColors : darkColors
            }
        });
    }

    const setDefaultTheme = () => {
        setTheme('default');
    }

    const transition = (
        <Transition.Together>
            <Transition.In type="fade" durationMs={ 300 } />
            <Transition.Out type="fade" durationMs={ 300 } />
        </Transition.Together>
    );

    return (
        <ThemeContext.Provider
            value={{
                state,
                setTheme,
                setDefaultTheme
            }}
        >
            <Transitioning.View style={{ flex: 1 }} { ...{ ref, transition } }>
                { children }
            </Transitioning.View>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;