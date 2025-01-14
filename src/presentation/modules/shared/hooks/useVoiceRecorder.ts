import { useEffect, useState } from 'react';

/* Constants */
import { permissionsMessages, permissionsStatus } from '@application/constants';

/* Adapters */
import { VoiceRecorder } from '@infrasturcture/adapters';

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
            VoiceRecorder.startRecording(lang);
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
            VoiceRecorder.stopRecording();
        }
        catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        VoiceRecorder.onSpeechStart(() => setIsRecording(true));
        VoiceRecorder.onSpeechEnd(() => setIsRecording(false));

        VoiceRecorder.onSpeechResults(value => setRecord(value || ''));

        VoiceRecorder.onSpeechError(error => {
            setError(error);
            setIsRecording(false);
        });

        return () => {
            VoiceRecorder.destroyListeners();
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