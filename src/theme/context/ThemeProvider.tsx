import React, { FC, PropsWithChildren, useEffect, useReducer, useRef } from 'react';
import { Appearance } from 'react-native';
import { Transitioning, TransitioningView, Transition } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ThemeContext from './ThemeContext';
import themeReducer from './themeReducer';

import { darkColors, lightColors, undefinedColors } from '../colors';

import { Theme, ThemeState } from '../../interfaces/theme';

const INITIAL_STATE: ThemeState = {
    colors: undefinedColors,
    deviceTheme: 'default',
    isLoadedTheme: false,
    selectedTheme: 'default',
    theme: 'default'
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

        dispatch({
            type: '[Theme] set is loaded theme',
            payload: {
                isLoaded: true
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

    useEffect(() => {
        AsyncStorage.getItem('jw-reports-theme').then(theme => {
            setTheme(theme as Theme || 'default');
        });
    }, []);

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

    useEffect(() => {
        if (state.deviceTheme === 'default' && state.isLoadedTheme) {
            setDefaultTheme();
        }
    }, [ state.deviceTheme ]);

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
                        <Transitioning.View style={{ flex: 1 }} { ...{ ref, transition } }>
                            { children }
                        </Transitioning.View>
                    </ThemeContext.Provider>
                )
            }
        </>
    );
}

export default ThemeProvider;