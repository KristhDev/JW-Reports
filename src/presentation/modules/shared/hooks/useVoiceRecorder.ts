import { useEffect, useState } from 'react';

/* Config */
import { voiceRecorderAdapter } from '@config/di';

/* Constants */
import { permissionsMessages } from '@application/constants/messages';
import { permissionsStatus } from '@application/constants/utils';

/* Hooks */
import useStatus from './useStatus';
import usePermissions from './usePermissions';

const useVoiceRecorder = () => {
    const [ isRecording, setIsRecording ] = useState<boolean>(false);
    const [ record, setRecord ] = useState<string>('');

    const {
        state: { permissions },
        askPermission,
        isRecordAudioBlocked,
        isRecordAudioDenied,
        isRecordAudioUnavailable,
        isRecordAudioUndetermined
    } = usePermissions();
    const { setError, setStatus } = useStatus();

    /**
     * Starts a speech recognition session in the given language.
     *
     * @param {string} lang - The language code to use for the speech recognition session.
     * @returns {Promise<void>} A promise that resolves when the speech recognition session is started.
     */
    const startRecording = async (lang: string): Promise<void> => {
        if (isRecordAudioUnavailable) {
            setStatus({ msg: permissionsMessages.UNSUPPORTED, code: 418 });
            return;
        }

        if (isRecordAudioBlocked) {
            setStatus({ msg: permissionsMessages.REQUEST, code: 403 });
            return;
        }

        let status = permissions.recordAudio;
        if (isRecordAudioDenied || isRecordAudioUndetermined) status = await askPermission('recordAudio');
        if (status !== permissionsStatus.GRANTED) return;

        try {
            voiceRecorderAdapter.startRecording(lang);
        }
        catch (error) {
            setError(error);
        }
    }

    /**
     * Stops the current speech recognition session.
     *
     * @returns {void} This function does not return anything.
     */
    const stopRecording = (): void => {
        try {
            voiceRecorderAdapter.stopRecording();
        }
        catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        voiceRecorderAdapter.onSpeechStart(() => setIsRecording(true));
        voiceRecorderAdapter.onSpeechEnd(() => setIsRecording(false));

        voiceRecorderAdapter.onSpeechResults(value => setRecord(value || ''));

        voiceRecorderAdapter.onSpeechError(error => {
            setError(error);
            setIsRecording(false);
        });

        return () => {
            voiceRecorderAdapter.destroyListeners();
        }
    }, []);

    return {
        isRecording,
        record,
        startRecording,
        stopRecording
    }
}

export default useVoiceRecorder;