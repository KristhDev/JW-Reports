import React, { FC } from 'react';
import { View } from 'react-native';
import { Checkbox as CheckboxPaper, Text } from 'react-native-paper';

import { useTheme } from '../../../hooks';

import { CheckboxProps } from './interfaces';

import styles from './styles';

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