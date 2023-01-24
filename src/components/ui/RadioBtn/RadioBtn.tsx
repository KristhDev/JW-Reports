import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { useTheme } from '../../../hooks';

import { RadioBtnProps } from './interfaces';

import styles from './styles';

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