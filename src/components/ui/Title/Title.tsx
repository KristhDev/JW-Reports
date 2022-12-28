import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../../../hooks';

import { Props } from './interfaces';

import styles from './styles';

export const Title: FC<Props> = ({ text, containerStyle, textStyle }) => {
    const { state: { colors } } = useTheme();

    return (
        <View style={[ styles.titleContainer, containerStyle,  ]}>
            <Text
                style={[
                    { ...styles.title, color: colors.titleText },
                    textStyle
                ]}
            >
                { text }
            </Text>
        </View>
    );
}