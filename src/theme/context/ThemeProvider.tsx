import React, { FC, PropsWithChildren, useReducer, useRef } from 'react';
import { Appearance } from 'react-native';
import { Transitioning, TransitioningView, Transition } from 'react-native-reanimated';

import ThemeContext from './ThemeContext';
import themeReducer from './themeReducer';

import { lightColors } from '../colors';

import { Theme, ThemeState } from '../../interfaces/theme';

const INITIAL_STATE: ThemeState = {
    theme: 'light',
    colors: lightColors
}

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ state, dispatch ] = useReducer(themeReducer, INITIAL_STATE);
    const ref = useRef<TransitioningView>(null);

    const setTheme = (theme: Theme) => {
        if (ref.current) ref.current.animateNextTransition();
        dispatch({ type: '[Theme] set_theme', payload: { theme } });
    }

    const setDefaultTheme = () => {
        const theme = Appearance.getColorScheme();
        setTheme(theme ?? 'light');
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