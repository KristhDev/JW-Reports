import React, { useEffect, useState, FC } from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../../hooks';

import { TabBarButtonProps } from './interfaces';

import styles from './styles';

export const TabBarButton: FC<TabBarButtonProps> = ({ active, color, iconName, onPress, title }) => {
    const { BUTTON_TRANSLUCENT_COLOR, BUTTON_TRANSPARENT_COLOR } = useTheme();
    const [ pressColor, setPressColor ] = useState<string>(BUTTON_TRANSPARENT_COLOR);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPressColor((active) ? BUTTON_TRANSLUCENT_COLOR : BUTTON_TRANSPARENT_COLOR);
        }, 200);

        return () => clearTimeout(timeout);
    }, [ active ]);

    return (
        <TouchableRipple
            style={ styles.touchable }
            onPress={ onPress }
            rippleColor={ pressColor }
            borderless
        >
            <>
                <Icon
                    color={ color }
                    name={ iconName || '' }
                    size={ 25 }
                />

                <Text style={{ color, fontSize: 12 }}>
                    { title }
                </Text>
            </>
        </TouchableRipple>
    );
}