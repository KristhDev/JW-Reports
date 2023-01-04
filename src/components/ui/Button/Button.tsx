import React, { FC } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import { useTheme } from '../../../hooks';

import { ButtonProps } from './interfaces';

import styles from './styles';

export const Button: FC<ButtonProps> = ({
    containerStyle,
    disabled,
    icon,
    onPress,
    text,
    textStyle,
    touchableStyle,
    underlayColor
}) => {
    const { state: { colors } } = useTheme();

    return (
        <TouchableHighlight
            disabled={ disabled }
            onPress={ onPress }
            style={[
                { ...styles.buttonTouchable, backgroundColor: colors.button },
                touchableStyle
            ]}
            underlayColor={ underlayColor || colors.buttonDark }
        >
            <View style={[ styles.buttonContainer, containerStyle ]}>
                <Text
                    style={[
                        { ...styles.buttonText, color: colors.contentHeader },
                        textStyle
                    ]}
                >
                    { text }
                </Text>

                { icon }
            </View>
        </TouchableHighlight>
    );
}