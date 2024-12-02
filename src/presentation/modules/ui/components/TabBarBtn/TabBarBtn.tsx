import React, { FC, useEffect, useState } from 'react';
import { Pressable, Text, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Hooks */
import { useTheme } from '@theme';

/* Interfaces */
import { TabBarBtnProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

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
export const TabBarBtn: FC<TabBarBtnProps> = ({ active, color, iconName, onLongPress, onPress, title, totalTabs }): JSX.Element => {
    const { styles, theme: { colors, fontSizes } } = useStyles(stylesheet);
    const [ pressColor, setPressColor ] = useState((active) ? colors.buttonTranslucent : colors.buttonTransparent);

    const { width } = useWindowDimensions();
    const { state: { theme } } = useTheme();

    /**
     * Effect to change pressColor when the button is pressed
     * or change app theme
     */
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPressColor((active) ? colors.buttonTranslucent : colors.buttonTransparent);
        }, 700);

        return () => clearTimeout(timeout);
    }, [ active, theme ]);

    return (
        <Pressable
            android_ripple={{
                color: pressColor,
                borderless: true,
                radius: width / (totalTabs * 2)
            }}
            onPress={ onPress }
            onLongPress={ onLongPress }
            style={ styles.pressable }
        >
            <>
                <Ionicons
                    color={ color }
                    name={ iconName as any }
                    size={ fontSizes.icon }
                />

                <Text style={{ color, fontSize: (fontSizes.xs + 4) }}>
                    { title }
                </Text>
            </>
        </Pressable>
    );
}