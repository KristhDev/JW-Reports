import React, { FC } from 'react';
import { TouchableRipple } from 'react-native-paper';

/* Interfaces */
import { FabProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for displaying a floating action
 * button to perform different actions in the app
 * @param {FabProps} props - { color, icon, onPress, touchColor, style }
 */
export const Fab: FC<FabProps> = ({ color, icon, onPress, touchColor, style }) => {
    return (
        <TouchableRipple
            borderless
            onPress= { onPress }
            rippleColor={ touchColor }
            style={{
                ...styles.fab,
                backgroundColor: color,
                ...style as any
            }}
        >
            { icon }
        </TouchableRipple>
    );
}