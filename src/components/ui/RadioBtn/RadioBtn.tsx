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
 * label to select an option
 * @param {RadioBtnProps} props - { label, onPress, value }
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
            >
                { label }
            </Text>
        </View>
    );
}