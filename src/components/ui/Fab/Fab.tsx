import React, { FC } from 'react';
import { TouchableRipple } from 'react-native-paper';

import { FabProps } from './interfaces';

import styles from './styles';

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