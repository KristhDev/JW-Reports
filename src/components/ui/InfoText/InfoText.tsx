import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../../../hooks';

import { InfoTextProps } from './interfaces';

import styles from './styles';

export const InfoText: FC<InfoTextProps> = ({ text, containerStyle, textStyle }) => {
    const { state: { colors } } = useTheme();

    return (
        <View style={[ styles.container, containerStyle ]}>
            <Text style={[ { ...styles.text, color: colors.icon }, textStyle ]}>{ text }</Text>
        </View>
    );
}