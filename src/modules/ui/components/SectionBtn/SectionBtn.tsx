import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { SectionBtnProps } from './interfaces';

/**
 * This component is responsible for showing the section button that
 * occupies the entire length of the screen.
 *
 * @param {SectionBtnProps} props { onPress: () => void, subText: string, text: string } - This is the
 * props for functionality of the component
 * - onPress: This is the function to be called when the button is pressed
 * - subText: This is the sub text to be displayed in the button
 * - text: This is the text to be displayed in the button
 * @return {JSX.Element} Return jsx element to render section with button
 */
export const SectionBtn: FC<SectionBtnProps> = ({ onPress, subText, text }): JSX.Element => {
    const { theme: { colors, fontSizes, margins } } = useStyles();

    return (
        <Pressable
            android_ripple={{ color: colors.buttonTransparent }}
            onPress={ onPress }
            style={{ padding: margins.sm }}
            testID="section-btn-pressable"
        >
            <View>
                <Text
                    style={{ color: colors.text, fontSize: fontSizes.sm }}
                    testID="section-btn-text"
                >
                    { text }
                </Text>

                <Text
                    style={{ color: colors.icon, fontSize: (fontSizes.sm - 2) }}
                    testID="section-btn-sub-text"
                >
                    { subText }
                </Text>
            </View>
        </Pressable>
    );
}