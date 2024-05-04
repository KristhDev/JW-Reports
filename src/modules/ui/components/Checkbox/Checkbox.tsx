import React, { FC } from 'react';
import { View } from 'react-native';
import { Checkbox as CheckboxPaper, Text } from 'react-native-paper';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { CheckboxProps } from './interfaces';

/* Styles */
import stylesheet from './styles';

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
    const { styles, theme: { colors } } = useStyles(stylesheet);

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
                style={[ styles.text, textStyle ]}
                testID="checkbox-text"
            >
                { label }
            </Text>
        </View>
    );
}