import { FC } from 'react';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useStyles } from 'react-native-unistyles';

import { MicrophoneBtnProps } from './interfaces';

export const MicrophoneBtn: FC<MicrophoneBtnProps> = ({ onPress, isRecording, disabled }): JSX.Element => {
    const { theme: { colors, fontSizes } } = useStyles();

    return (
        <Pressable
            disabled={ disabled }
            onPress={ onPress }
        >
            <Ionicons
                color={ colors.icon }
                name={ (isRecording) ? 'mic-off-outline' : 'mic-outline' }
                size={ fontSizes.icon }
            />
        </Pressable>
    );
}