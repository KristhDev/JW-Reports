import React, { useEffect, useState, FC } from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { TabBarBtnProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for displaying a button for the navigation bar
 * @param {TabBarBtnProps} props - { active, color, iconName, onPress, title }
 */
export const TabBarBtn: FC<TabBarBtnProps> = ({ active, color, iconName, onPress, title }) => {
    const { state: { selectedTheme }, BUTTON_TRANSLUCENT_COLOR, BUTTON_TRANSPARENT_COLOR } = useTheme();
    const [ pressColor, setPressColor ] = useState<string>(BUTTON_TRANSPARENT_COLOR);

    /**
     * Effect to change pressColor when the button is pressed
     * or change app theme
     */
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