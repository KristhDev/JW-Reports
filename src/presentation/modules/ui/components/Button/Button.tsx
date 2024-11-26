import React, { FC } from 'react';
import { Text, Pressable, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { ButtonProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

/**
 * This component is responsible for displaying a button with a
 * pressable area, text and/or icon, and a container style.
 *
 * @param {ButtonProps} props { containerStyle: StyleProp<ViewStyle>, disabled: boolean, icon: ReactNode, onPress: () => void, pressableStyle: StyleProp<ViewStyle>, style: StyleProp<ViewStyle>, text: string, textStyle: StyleProp<TextStyle>, underlayColor: string } - This is the props
 * for functionality of the component
 * - containerStyle: This is the style of the outer container, default is `undefined`
 * - disabled: This is the disabled state of the button, default is `false`
 * - icon: This is the icon of the button, default is `undefined`
 * - onPress: This is the function to be called when the button is pressed, default is `undefined`
 * - pressableStyle: This is the style of the pressable area, default is `undefined`
 * - style: This is the style of the button, default is `undefined`
 * - text: This is the text of the button, default is `undefined`
 * - textStyle: This is the style of the text, default is `undefined`
 * - underlayColor: This is the color of the underlay, default is `rgba(0, 0, 0, 0.30)`
 * @return {JSX.Element} Return jsx element to render button
 */
export const Button: FC<ButtonProps> = ({
    containerStyle,
    disabled,
    icon,
    onPress,
    pressableStyle,
    style,
    text,
    textStyle,
    underlayColor = 'rgba(0, 0, 0, 0.30)'
}): JSX.Element => {
    const { styles } = useStyles(stylesheet);

    return (
        <View style={[ styles.buttonContainer, style ]}>
            <Pressable
                android_ripple={{ color: underlayColor }}
                disabled={ disabled }
                onPress={ onPress }
                style={[ styles.buttonPressable, pressableStyle ]}
                testID="button-pressable"
            >
                <View style={[ styles.buttonContent, containerStyle ]}>
                    { (text) && (
                        <Text
                            style={[ styles.buttonText, textStyle ]}
                            testID="button-text"
                        >
                            { text }
                        </Text>
                    ) }

                    { icon }
                </View>
            </Pressable>
        </View>
    );
}