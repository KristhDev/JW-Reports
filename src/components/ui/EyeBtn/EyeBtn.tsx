import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { EyeBtnProps } from './interfaces';

/**
 * This component is responsible for displaying an eye-shaped button,
 * it is used for the password fields and to be able to display it
 * @param {EyeBtnProps} props - { onToggle, value }
 */
export const EyeBtn: FC<EyeBtnProps> = ({ onToggle, value }) => {
    const { state: { colors } } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={ 0.75 }
            onPress={ () => onToggle(!value) }
        >
            <Icon
                color={ colors.icon }
                name={ (value) ? 'eye-off-outline' : 'eye-outline' }
                size={ 25 }
            />
        </TouchableOpacity>
    );
}