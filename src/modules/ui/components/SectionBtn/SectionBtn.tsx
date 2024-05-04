import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { TouchableRipple } from 'react-native-paper';

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
    const { theme: { colors, margins } } = useStyles();

    return (
        <TouchableRipple
            borderless
            centered
            onPress={ onPress }
            rippleColor={ colors.buttonTransparent }
            style={{ padding: margins.sm }}
            testID="section-btn-touchable"
        >
            <View>
                <Text
                    style={{ color: colors.text, fontSize: margins.sm }}
                    testID="section-btn-text"
                >
                    { text }
                </Text>

                <Text
                    style={{ color: colors.icon, fontSize: 14 }}
                    testID="section-btn-sub-text"
                >
                    { subText }
                </Text>
            </View>
        </TouchableRipple>
    );
}