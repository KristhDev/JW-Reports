import React, { useEffect, useState, FC } from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../../hooks';

import { TabBarButtonProps } from './interfaces';

import styles from './styles';

export const TabBarButton: FC<TabBarButtonProps> = ({ active, color, iconName, onPress, title }) => {
    const { state: { selectedTheme }, BUTTON_TRANSLUCENT_COLOR, BUTTON_TRANSPARENT_COLOR } = useTheme();
    const [ pressColor, setPressColor ] = useState<string>(BUTTON_TRANSPARENT_COLOR);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPressColor((active) ? BUTTON_TRANSLUCENT_COLOR : BUTTON_TRANSPARENT_COLOR);
        }, 700);

        return () => clearTimeout(timeout);
    }, [ active, selectedTheme ]);

    return (
        <TouchableRipple
            borderless
            onPress={ onPress }
            rippleColor={ pressColor }
            style={ styles.touchable }
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