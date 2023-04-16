import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Fab } from '../Fab';

/* Hooks */
import { useTheme } from '../../../hooks';

/**
 * This component is responsible for render button to change
 * app theme.
 */
export const ThemeBtn = () => {
    const { state: { selectedTheme, colors }, setTheme } = useTheme();

    return (
        <Fab
            color={ colors.button }
            icon={
                <Icon
                    color={ colors.contentHeader }
                    name={ (selectedTheme === 'dark') ? 'sunny-outline' : 'moon-outline' }
                    size={ (selectedTheme === 'dark') ? 35 : 30 }
                    style={{ marginLeft: (selectedTheme === 'dark') ? 2 : 1, marginBottom: 1 }}
                />
            }
            onPress={ () => setTheme((selectedTheme === 'dark') ? 'light' : 'dark') }
            style={{ top: 20, right: 20, position: 'absolute' }}
            touchColor="rgba(0, 0, 0, 0.15)"
        />
    );
}