import React, { FC } from 'react';
import { Text, Pressable, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { ButtonProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

/**
 * This component shows a custom button for the different actions of the app.
 *
 * @param {ButtonProps} props {
 *      containerStyle: StyleProp<ViewStyle>,
 *      disabled: boolean,
 *      icon: ReactNode,
 *      onPress: () => void,
 *      text: string,
 *      textStyle: StyleProp<TextStyle>,
 *      pressableStyle: StyleProp<ViewStyle>,
 *      underlayColor: string
 *  } - This is a props to functionality of the component
 * - containerStyle: This is a style of the container, default is `undefined`
 * - disabled: This is a boolean, default is `undefined`
 * - icon: This is a ReactNode, default is `undefined`
 * - onPress: This is a function that is called when the button is pressed
 * - text: This is a string
 * - textStyle: This is a style of the text, default is `undefined`
 * - pressableStyle: This is a style of the pressable, default is `undefined`
 * - underlayColor: This is a color of the underlay, default is `undefined`
 * @return {JSX.Element} Return jsx element to render button
 */
export const Button: FC<ButtonProps> = ({
    containerStyle,
    disabled,
    icon,
    onPress,
    text,
    textStyle,
    pressableStyle,
    underlayColor
}): JSX.Element => {
    const { styles } = useStyles(stylesheet);

    return (
        <View style={{ borderRadius: styles.buttonPressable.borderRadius, overflow: 'hidden' }}>
            <Pressable
                android_ripple={{ color: underlayColor || 'rgba(0, 0, 0, 0.30)' }}
                disabled={ disabled }
                onPress={ onPress }
                style={[ styles.buttonPressable, pressableStyle ]}
                testID="button-pressable"
            >
                <View style={[ styles.buttonContainer, containerStyle ]}>
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