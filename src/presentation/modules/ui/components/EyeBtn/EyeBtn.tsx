import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Interfaces */
import { EyeBtnProps } from './interfaces';

/**
 * This component is responsible for displaying an eye-shaped button,
 * it is used for the password fields and to be able to display it.
 *
 * @param {EyeBtnProps} props { onToggle: (value: boolean) => void, value: boolean } - This is the
 * props for functionality of the component
 * - onToggle: This is a function to toggle the state of the value
 * - value: This is the current state of the value
 * @return {JSX.Element} Return jsx element to render eye button
 */
export const EyeBtn: FC<EyeBtnProps> = ({ onToggle, value }): JSX.Element => {
    const { theme: { colors, fontSizes } } = useStyles();

    return (
        <TouchableOpacity
            activeOpacity={ 0.75 }
            onPress={ () => onToggle(!value) }
            testID="eye-btn-touchable"
        >
            <Ionicons
                color={ colors.icon }
                name={ (value) ? 'eye-off-outline' : 'eye-outline' }
                size={ fontSizes.icon }
            />
        </TouchableOpacity>
    );
}