import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Fab } from '../Fab';

import { useTheme } from '../../../hooks';

export const BackButton: FC<{ onPress?: () => void }> = ({ onPress }) => {
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    return (
        <Fab
            color={ 'transparent' }
            icon={
                <Icon
                    color={ colors.button }
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