import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Interfaces */
import { CheckboxProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

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
            <Pressable
                onPress={ onPress }
                android_ripple={{
                    color: colors.button,
                    borderless: true,
                    radius: styles.checkbox.width - 2
                }}
                testID="checkbox-pressable"
            >
                <View
                    style={{
                        ...styles.checkbox,
                        borderColor: (status === 'checked') ? colors.button : colors.text,
                        backgroundColor: (status === 'checked') ? colors.button : 'transparent',
                    }}
                >
                    <Ionicons
                        name="checkmark-sharp"
                        color={ (status === 'checked') ? colors.contentHeader : 'transparent' }
                        size={ 20 }
                        style={{ marginLeft: -2, marginTop: -2 }}
                    />
                </View>
            </Pressable>

            <Text
                style={[ styles.text, textStyle ]}
                testID="checkbox-text"
            >
                { label }
            </Text>
        </View>
    );
}