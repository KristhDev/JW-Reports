import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Fab } from '../Fab';

/* Hooks */
import { useTheme } from '../../../hooks';

/**
 * This component shows a custom button to navigate to the
 * previous screen
 *
 * @param {{ color?: string, onPress?: () => void }} props { color: string, onPress: () => void } - This is a props
 * to functionality of the component
 * - color: This is a color of the icon, default is `colors.button` for theme
 * - onPress: This is a function that is called when the button is pressed, default is `undefined`
 * @return {JSX.Element} Return jsx element to render back button
 */
export const BackButton: FC<{ color?: string, onPress?: () => void }> = ({ color, onPress }): JSX.Element => {
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    return (
        <Fab
            color="transparent"
            icon={
                <Icon
                    color={ color ?? colors.button }
                    name="arrow-back-outline"
                    size={ 30 }
                />
            }
            onPress={ () => onPress && onPress() }
            touchColor={ BUTTON_TRANSPARENT_COLOR }
        />
    );
}