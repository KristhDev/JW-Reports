import { FC, JSX } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Link } from '../Link';

import { useToaster } from '@ui/hooks';

import { ToasterProps } from './interfaces';

import { stylesheet } from './styles';

export const Toaster: FC<ToasterProps> = ({ cancelAction, confirmAction, message, style, textStyle }): JSX.Element => {
    const { width } = useWindowDimensions();
    const { styles, theme: { colors, fontSizes } } = useStyles(stylesheet);

    const { hideToast } = useToaster();

    return (
        <Animated.View 
            style={[ styles.toasterContainer(width), style ]}
            entering={ FadeInDown.delay(300) }
            exiting={ FadeOutDown }
        >
            <View style={[ styles.toasterContent ]}>
                <Text style={[ styles.toasterText, textStyle ]}>
                    { message }
                </Text>

                <View style={[ styles.toasterCloseButton ]}>
                    <Pressable
                        onPress={ hideToast }
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
        </Animated.View>
    );
}