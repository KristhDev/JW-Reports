import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Fab } from '../Fab';

/* Hooks */
import { useTheme } from '../../../theme';

/**
 * This component is responsible for render button to change
 * app theme.
 *
 * @return {JSX.Element} Return jsx element to render a button of theme
 */
export const ThemeBtn = (): JSX.Element => {
    const { theme: { colors, fontSizes, margins } } = useStyles();
    const { setTheme, state: { theme } } = useTheme();

    return (
        <Fab
            color={ colors.button }
            icon={
                <Ionicons
                    color={ colors.contentHeader }
                    name={ (theme === 'dark') ? 'sunny-outline' : 'moon-outline' }
                    size={ (theme === 'dark') ? (fontSizes.lg + 3) : (fontSizes.icon + 5) }
                    style={{ marginLeft: (theme === 'dark') ? 0 : 1, marginBottom: 1 }}
                />
            }
            onPress={ () => setTheme((theme === 'dark') ? 'light' : 'dark') }
            style={{ top: margins.md, right: margins.md, position: 'absolute' }}
            touchColor="rgba(0, 0, 0, 0.15)"
        />
    );
}