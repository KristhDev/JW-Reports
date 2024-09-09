import React, { FC, PropsWithChildren } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { SectionBtnProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

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
export const SectionBtn: FC<PropsWithChildren<SectionBtnProps>> = ({ children, disabled, onPress, subText, text }): JSX.Element => {
    const { styles, theme: { colors } } = useStyles(stylesheet);

    return (
        <Pressable
            android_ripple={{ color: colors.buttonTransparent }}
            disabled={ disabled }
            onPress={ onPress }
            style={ styles.pressable }
            testID="section-btn-pressable"
        >
            <View style={{ flex: 1 }}>
                <Text
                    style={ styles.text }
                    testID="section-btn-text"
                >
                    { text }
                </Text>

                <Text
                    style={ styles.subText }
                    testID="section-btn-sub-text"
                >
                    { subText }
                </Text>
            </View>

            { children }
        </Pressable>
    );
}