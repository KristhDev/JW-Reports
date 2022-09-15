import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../../../hooks';

import { Props } from './interfaces';

import styles from './styles';

export const Title: FC<Props> = ({ text, containerStyle, textStyle }) => {
    const { state: { colors } } = useTheme();

    return (
        <View style={[ containerStyle, styles.titleContainer ]}>
            <Text
                style={[
                    textStyle,
                    { ...styles.title, color: colors.titleText }
                ]}
            >
                { text }
            </Text>
        </View>
    );
}