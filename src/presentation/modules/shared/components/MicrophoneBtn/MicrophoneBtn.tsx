import { FC } from 'react';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { MicrophoneBtnProps } from './interfaces';

/**
 * A simple button to toggle recording with a microphone icon.
 *
 * @param {MicrophoneBtnProps} props Component props.
 * @returns {JSX.Element} The component.
 */
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