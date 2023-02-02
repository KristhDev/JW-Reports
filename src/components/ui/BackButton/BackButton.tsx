import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Fab } from '../Fab';

/* Hooks */
import { useTheme } from '../../../hooks';

/**
 * This component shows a custom button to navigate to the
 * previous screen
 * @param { color?: string, onPress?: () => void } props { color, onPress }
 */
export const BackButton: FC<{ color?: string, onPress?: () => void }> = ({ color, onPress }) => {
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    return (
        <Fab
            color="transparent"
            icon={
                <Icon
                    color={ color ?? colors.button }
                    name="arrow-back-outline"
                    style={{ marginLeft: 1 }}
                    size={ 28 }
                />
            }
            onPress={ () => onPress && onPress() }
            touchColor={ BUTTON_TRANSPARENT_COLOR }
        />
    );
}