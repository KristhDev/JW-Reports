import { FC, JSX } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Components */
import { Link } from '../Link';

/* Interfaces */
import { ToasterProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

/**
 * A functional component that displays a toaster notification with an optional message,
 * confirm action, and cancel action. The toaster animates its entrance and exit.
 *
 * @param {ToasterProps} props - The component props.
 * @param {ToastAction} [props.cancelAction] - The action to be performed when the cancel button is pressed.
 * @param {ToastAction} [props.confirmAction] - The action to be performed when the confirm button is pressed.
 * @param {string} props.message - The message to be displayed in the toaster.
 * @param {StyleProp<ViewStyle>} [props.style] - The style to be applied to the toaster container.
 * @param {StyleProp<TextStyle>} [props.textStyle] - The style to be applied to the toaster text.
 * @returns {JSX.Element} The rendered toaster component.
 */
export const Toaster: FC<ToasterProps> = ({ cancelAction, confirmAction, onClose, message, style, textStyle }): JSX.Element => {
    const { width } = useWindowDimensions();
    const { styles, theme: { colors, fontSizes } } = useStyles(stylesheet);

    return (
        <View 
            style={[ styles.toasterContainer(width), style ]}
        >
            <View style={[ styles.toasterContent ]}>
                <Text style={[ styles.toasterText, textStyle ]}>
                    { message }
                </Text>

                <View style={[ styles.toasterCloseButton ]}>
                    <Pressable
                        onPress={ onClose }
                        android_ripple={{ color: colors.buttonTransparent }}
                    >
                        <Ionicons 
                            color={ colors.icon }
                            name="close"
                            size={ fontSizes.icon }
                        />
                    </Pressable>
                </View>
            </View>

            { (!!confirmAction || !!cancelAction) && (
                <View style={ styles.toasterActionsContainer }>
                    { (!!confirmAction) && (
                        <Link 
                            onPress={ confirmAction.onPress }
                            style={ confirmAction.touchableStyle }
                            textStyle={ confirmAction.textStyle }
                        >
                            { confirmAction.label }
                        </Link>
                    ) }

                    { (!!cancelAction) && (
                        <Link 
                            onPress={ cancelAction.onPress }
                            style={ cancelAction.touchableStyle }
                            textStyle={ cancelAction.textStyle }
                        >
                            { cancelAction.label }
                        </Link>
                    ) }
                </View>
            ) }
        </View>
    );
}