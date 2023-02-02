import React, { FC } from 'react';
import { View, Text } from 'react-native';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { TitleProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for render a title for screens
 * @param {TitleProps} - { text, containerStyle, textStyle }
 */
export const Title: FC<TitleProps> = ({ text, containerStyle, textStyle }) => {
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