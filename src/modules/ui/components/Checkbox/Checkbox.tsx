import React, { FC } from 'react';
import { View } from 'react-native';
import { Checkbox as CheckboxPaper, Text } from 'react-native-paper';

/* Hooks */
import { useTheme } from '../../../theme';

/* Interfaces */
import { CheckboxProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * Renders a checkbox component with the specified props.
 *
 * @param {CheckboxProps} props - The props for the checkbox component.
 * @param {string} props.label - The label for the checkbox.
 * @param {function} props.onPress - The function to be called when the checkbox is pressed.
 * @param {string} props.status - The status of the checkbox.
 * @param {object} props.style - The style object for the checkbox component.
 * @param {object} props.textStyle - The style object for the checkbox label.
 * @returns {ReactElement} The rendered checkbox component.
 */
export const Checkbox: FC<CheckboxProps> = ({ label, onPress, status, style, textStyle }) => {
    const { state: { colors } } = useTheme();

    return (
        <View style={[ styles.container, style ]}>
            <CheckboxPaper
                status={ status }
                uncheckedColor={ colors.text }
                color={ colors.button }
                onPress={ onPress }
                testID="checkbox-checkbox"
            />

            <Text
                style={[ { ...styles.text, color: colors.text }, textStyle ]}
                testID="checkbox-text"
            >
                { label }
            </Text>
        </View>
    );
}