import { useEffect, useState } from 'react';

/* Adapters */
import { VoiceRecorder } from '@infrasturcture/adapters';

/* Hooks */
import useStatus from './useStatus';

const useVoiceRecorder = () => {
    const [ isRecording, setIsRecording ] = useState<boolean>(false);
    const [ record, setRecord ] = useState<string>('');

    const { setError } = useStatus();

    /**
     * Starts a speech recognition session in the given language.
     *
     * @param {string} lang - The language code to use for the speech recognition session.
     * @returns {Promise<void>} A promise that resolves when the speech recognition session is started.
     */
    const startRecording = async (lang: string): Promise<void> => {
        try {
            await VoiceRecorder.startRecording(lang);
        }
        catch (error) {
            setError(error);
        }
    }

    /**
     * Stops the current speech recognition session.
     *
     * @returns {Promise<void>} A promise that resolves when the speech recognition session is stopped.
     */
    const stopRecording = async (): Promise<void> => {
        try {
            await VoiceRecorder.stopRecording();
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