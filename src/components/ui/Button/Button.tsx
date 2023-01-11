import React, { FC } from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';

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
        <TouchableRipple
            borderless
            disabled={ disabled }
            onPress={ onPress }
            rippleColor={ underlayColor || 'rgba(0, 0, 0, 0.30)' }
            style={[
                { ...styles.buttonTouchable, backgroundColor: colors.button },
                touchableStyle
            ]}
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
        </TouchableRipple>
    );
}