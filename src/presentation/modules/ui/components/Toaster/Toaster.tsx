import { FC, JSX } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useToaster } from '@ui/hooks';

import { ToasterProps } from './interfaces';

import { stylesheet } from './styles';

export const Toaster: FC<ToasterProps> = ({ message, style, textStyle }): JSX.Element => {
    const { width } = useWindowDimensions();
    const { styles, theme: { colors, fontSizes } } = useStyles(stylesheet);

    const { hideToast } = useToaster();

    return (
        <Animated.View 
            style={[ styles.toasterContainer(width), style ]}
            entering={ FadeInDown.delay(300) }
            exiting={ FadeOutDown }
        >
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
        </Animated.View>
    );
}