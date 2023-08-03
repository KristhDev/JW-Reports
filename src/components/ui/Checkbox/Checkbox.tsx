import React, { FC } from 'react';
import { View } from 'react-native';
import { Checkbox as CheckboxPaper, Text } from 'react-native-paper';

import { useTheme } from '../../../hooks';

import { CheckboxProps } from './interfaces';

import styles from './styles';

export const Checkbox: FC<CheckboxProps> = ({ onPress, status, style, textStyle }) => {
    const { state: { colors } } = useTheme();

    return (
        <View style={[ styles.container, style ]}>
            <CheckboxPaper
                status={ status }
                uncheckedColor={ colors.text }
                color={ colors.button }
                onPress={ onPress }
            />

            <Text style={[ { ...styles.text, color: colors.text }, textStyle ]}>Editar requerimiento de horas</Text>
        </View>
    );
}