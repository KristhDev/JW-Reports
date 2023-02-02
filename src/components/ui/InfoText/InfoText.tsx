import React, { FC } from 'react';
import { View, Text } from 'react-native';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { InfoTextProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for displaying a help text
 * that can be used to inform or as a subtitle
 * @param {InfoTextProps} props - { text, containerStyle, textStyle }
 * @returns
 */
export const InfoText: FC<InfoTextProps> = ({ text, containerStyle, textStyle }) => {
    const { state: { colors } } = useTheme();

    return (
        <View style={[ styles.container, containerStyle ]}>
            <Text style={[ { ...styles.text, color: colors.icon }, textStyle ]}>{ text }</Text>
        </View>
    );
}