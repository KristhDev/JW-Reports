import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { RadioBtnProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for displaying a radio button with a
 * label to select an option.
 * @param {RadioBtnProps} props { label: string, onPress: () => void, value: string } - This is the props
 * for functionality of the component
 * - label: This is the label of the radio button
 * - onPress: This is the function to be called when the radio button is pressed
 * - value: This is the value of the radio button
 */
export const RadioBtn: FC<RadioBtnProps> = ({ label, onPress, value }) => {
    const { state: { colors } } = useTheme();

    return (
        <View style={ styles.radioContainer }>
            <RadioButton
                value={ value }
                color={ colors.button }
                uncheckedColor={ colors.icon }
            />

            <Text
                onPress={ onPress }
                style={{ ...styles.radioLabel, color: colors.text }}
                testID="radio-btn-text"
            >
                { label }
            </Text>
        </View>
    );
}