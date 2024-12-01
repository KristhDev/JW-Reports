import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { RadioBtnProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

/**
 * This component is responsible for displaying a radio button with a
 * label to select an option.
 *
 * @param {RadioBtnProps} props { label: string, onPress: () => void, value: string } - This is the props
 * for functionality of the component
 * - label: This is the label of the radio button
 * - onPress: This is the function to be called when the radio button is pressed
 * - value: This is the value of the radio button
 * @return {JSX.Element} Returns the component to show the field with radio
 */
export const RadioBtn: FC<RadioBtnProps> = ({ isSelected, label, onPress, style }): JSX.Element => {
    const { styles, theme: { colors } } = useStyles(stylesheet);

    return (
        <View
            style={[ styles.radioContainer, style ]}
            testID="radio-btn-container"
        >
            <Pressable
                android_ripple={{
                    color: colors.button,
                    borderless: true,
                    radius: 15
                }}
                onPress={ onPress }
                testID="radio-btn-pressable"
            >
                <View style={ styles.radioPressable(isSelected) }>
                    <View style={ styles.radioCircle(isSelected) } />
                </View>
            </Pressable>

            <Text
                onPress={ onPress }
                style={ styles.radioLabel }
                testID="radio-btn-text"
            >
                { label }
            </Text>
        </View>
    );
}