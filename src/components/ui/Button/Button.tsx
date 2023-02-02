import React, { FC } from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { ButtonProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component shows a custom button for the different actions of the app
 * @param {ButtonProps} props - { containerStyle, disabled, icon, onPress, text, textStyle, touchableStyle, underlayColor }
 */
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