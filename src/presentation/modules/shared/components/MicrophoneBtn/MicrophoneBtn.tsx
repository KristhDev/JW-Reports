import React, { FC, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Fab, useUI } from '@ui';

/* Hooks */
import { useVoiceRecorder } from '../../hooks';

/* Interfaces */
import { MicrophoneBtnProps } from './interfaces';

/* Styles */
import { themeStylesheet } from '@theme';

/**
 * A button to record audio from the device's microphone.
 * If a `conditionForNotRecording` prop is provided and evaluates to true, the button will call the `onNotRecording` callback when pressed.
 * Otherwise, the button will start or stop recording audio from the device's microphone, depending on the state of the component.
 * The component will also call the `onRecord` callback whenever the recording is stopped or the user presses the button while a recording is in progress.
 *
 * @prop {boolean} [conditionForNotRecording=false] - A condition to check if the button should call the `onNotRecording` callback when pressed.
 * @prop {() => void} [onNotRecording] - A callback to call if the `conditionForNotRecording` prop is true.
 * @prop {(record: string) => void} onRecord - A callback to call with the recorded audio whenever the recording is stopped or the user presses the button while a recording is in progress.
 * @prop {ViewStyle} [style] - The style of the button.
 * @returns {JSX.Element} A button to record audio from the device's microphone.
 */
export const MicrophoneBtn: FC<MicrophoneBtnProps> = ({ conditionForNotRecording = false, onNotRecording, onRecord, style }): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { isRecording, record, startRecording, stopRecording } = useVoiceRecorder();
    const { state: { keyboard } } = useUI();

    /**
     * Handles the record button's onPress event.
     *
     * If the recording is in progress, stops the recording.
     * Otherwise, starts the recording in Spanish language.
     *
     * @returns {void} This function does not return anything.
     */
    const handleRecord = (): void => {
        if (conditionForNotRecording) {
            onNotRecording && onNotRecording();
            return;
        }

        if (isRecording) stopRecording();
        else startRecording('es-ES');
    }

    useEffect(() => {
        if (record.trim().length === 0) return;
        onRecord(record);
    }, [ record ]);

    return (
        <Fab
            color={ colors.button }
            icon={
                <Ionicons
                    color={ colors.contentHeader }
                    name={ (isRecording) ? 'mic-off-outline' : 'mic-outline' }
                    size={ fontSizes.xl }
                    testID="microphone-btn-icon"
                />
            }
            onPress={ handleRecord }
            style={[ themeStyles.fabBottomRight, { bottom: keyboard.height + margins.sm }, style ]}
            touchColor="rgba(0, 0, 0, 0.15)"
        />
    );
}