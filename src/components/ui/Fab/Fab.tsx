import React, { FC } from 'react';
import { TouchableHighlight } from 'react-native';

import { Props } from './interfaces';

import styles from './styles';

export const Fab: FC<Props> = ({ color, icon, onPress, touchColor, style }) => {
    return (
        <TouchableHighlight
            activeOpacity={ 1 }
            onPress= { onPress }
            style={{
                ...styles.fab,
                backgroundColor: color,
                ...style as any
            }}
            underlayColor={ touchColor }
        >
            { icon }
        </TouchableHighlight>
    );
}