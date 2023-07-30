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
 * This component is responsible for displaying a button for the navigation bar.
 *
 * @param {TabBarBtnProps} props {
 *      active: boolean,
 *      color: string,
 *      iconName: string,
 *      onPress: () => void,
 *      title: string
 *  } - This is the propsprops for functionality of the component
 * - active: This is the active state of the button
 * - color: This is the color of the button
 * - iconName: This is the icon name of the button
 * - onPress: This is the function to be called when the button is pressed
 * - title: This is the title of the button
 * @return {JSX.Element} Return jsx element to render tab bar btn of navigation
 */
export const TabBarBtn: FC<TabBarBtnProps> = ({ active, color, iconName, onPress, title }): JSX.Element => {
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