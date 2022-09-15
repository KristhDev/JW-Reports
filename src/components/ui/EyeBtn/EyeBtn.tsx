import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../../hooks';

import { Props } from './interfaces';

export const EyeBtn: FC<Props> = ({ onToggle, value }) => {
    const { state: { colors } } = useTheme();

    return (
        <>
            {
                (value) ? (
                    <TouchableOpacity
                        activeOpacity={ 0.75 }
                        onPress={ () => onToggle(false) }
                    >
                        <Icon
                            color={ colors.icon }
                            name="eye-off-outline"
                            size={ 25 }
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={ 0.75 }
                        onPress={ () => onToggle(true) }
                    >
                        <Icon
                            color={ colors.icon }
                            name="eye-outline"
                            size={ 25 }
                        />
                    </TouchableOpacity>
                )
            }
        </>
    );
}