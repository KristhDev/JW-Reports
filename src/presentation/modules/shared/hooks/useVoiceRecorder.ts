import { useEffect, useMemo, useState } from 'react';

/* Config */
import { messagesService, toasterAdapter, voiceRecorderAdapter } from '@config/di';

/* Constants */
import { permissionsStatus } from '@application/constants/utils';

/* Hooks */
import usePermissions from './usePermissions';
import { useUI } from '@ui/hooks';

const useVoiceRecorder = () => {
    const appMessages = messagesService.appMessages;
    const permissionsMessages = messagesService.permissionsMessages;

    const [ isRecording, setIsRecording ] = useState<boolean>(false);
    const [ record, setRecord ] = useState<string>('');

    const hasRecord = useMemo(() => record.trim().length > 0, [ record ]);

    const {
        state: { permissions },
        askPermission,
        isRecordAudioBlocked,
        isRecordAudioDenied,
        isRecordAudioUnavailable,
        isRecordAudioUndetermined
    } = usePermissions();

    const { setActiveFormField, hasActiveFormField } = useUI();

    /**
     * Starts a speech recognition session in the given language.
     *
     * @param {string} lang - The language code to use for the speech recognition session.
     * @returns {Promise<void>} A promise that resolves when the speech recognition session is started.
     */
    const startRecording = async (lang: string): Promise<void> => {
        if (isRecordAudioUnavailable) {
            toasterAdapter.showToast(permissionsMessages.UNSUPPORTED);
            return;
        }

        if (isRecordAudioBlocked) {
            toasterAdapter.showPermissionsToast();
            return;
        }

        let status = permissions.recordAudio;
        if (isRecordAudioDenied || isRecordAudioUndetermined) status = await askPermission('recordAudio');
        if (status !== permissionsStatus.GRANTED) return;

        try {
            voiceRecorderAdapter.startRecording(lang);
        }
        catch (error) {
            toasterAdapter.showError(error);
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
            toasterAdapter.showError(error);
        }
    }

    const recordFormField = (field: string): void => {
        setActiveFormField(field);

        if (!hasActiveFormField) {
            toasterAdapter.showToast(appMessages.SELECT_FIELD_TO_RECORD);
            return;
        }

        if (isRecording) stopRecording();
        else startRecording('es-ES');
    }

    useEffect(() => {
        voiceRecorderAdapter.onSpeechStart(() => setIsRecording(true));
        voiceRecorderAdapter.onSpeechEnd(() => setIsRecording(false));

        voiceRecorderAdapter.onSpeechResults(value => setRecord(value || ''));

        voiceRecorderAdapter.onSpeechError(error => {
            toasterAdapter.showError(error);
            setIsRecording(false);
        });

        return () => {
            voiceRecorderAdapter.destroyListeners();
        }
    }, []);

    return {
        isRecording,
        record,
        hasRecord,

        recordFormField,
        startRecording,
        stopRecording
    }
}

export default useVoiceRecorder;