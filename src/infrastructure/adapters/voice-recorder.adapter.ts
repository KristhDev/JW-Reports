import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';

/* Constants */
import { permissionsStatus } from '@application/constants/utils/permissions.util';

/* Features */
import { PermissionStatus } from '@application/features/permissions';

/* Contracts */
import { VoiceRecorderAdapterContract } from '@domain/contracts/adapters';
import { MessagesServiceContract } from '@domain/contracts/services';

/* Errors */
import { VoiceRecorderError } from '@domain/errors';

/* Interfaces */
import { AppMessages, SpeakerLanguageKey, SpeakerLanguages } from '@infrastructure/interfaces';

export class VoiceRecorderAdapter implements VoiceRecorderAdapterContract {
    public readonly speakerLanguages: SpeakerLanguages = {
        en: 'en-US',
        es: 'es-ES',
    }

    private readonly appMessages: AppMessages;

    constructor(
        private readonly messagesService: MessagesServiceContract
    ) {
        this.appMessages = this.messagesService.appMessages;
    }

    /**
     * Destroys all listeners for speech recognition events.
     *
     * @returns {void} - This function does not return anything.
     */
    public destroyListeners(): void {
        ExpoSpeechRecognitionModule.removeAllListeners('start');
        ExpoSpeechRecognitionModule.removeAllListeners('end');
        ExpoSpeechRecognitionModule.removeAllListeners('result');
        ExpoSpeechRecognitionModule.removeAllListeners('error');
    }

    /**
     * Gets the current permission status for the record audio permission.
     *
     * @returns {Promise<PermissionStatus>} A promise that resolves with the current permission status 
     * for the record audio permission.
     */
    public async getRecordAudioPermission(): Promise<PermissionStatus> {
        const result = await ExpoSpeechRecognitionModule.getPermissionsAsync();
        const isUndetermined = result.status === permissionsStatus.UNDETERMINED;

        if (result.granted) return permissionsStatus.GRANTED;
        if (isUndetermined) return permissionsStatus.UNDETERMINED;
        if (result.canAskAgain && !isUndetermined) return permissionsStatus.DENIED;
        if (!result.canAskAgain && !isUndetermined) return permissionsStatus.BLOCKED;

        return permissionsStatus.UNAVAILABLE;
    }

    /**
     * Sets a callback to be called when the speech recognition session is ended.
     *
     * @param {() => void} callback - The callback to be called when the speech recognition session is ended.
     * @returns {void} - This function does not return anything.
     */
    public onSpeechEnd(callback: () => void): void {
        ExpoSpeechRecognitionModule.addListener('end', callback);
    }

    /**
     * Sets a callback to be called when an error occurs in the speech recognition session.
     *
     * @param {(error: VoiceRecorderError) => void} callback - The callback to be called when an error occurs in the 
     * speech recognition session.
     * @returns {void} - This function does not return anything.
     */
    public onSpeechError(callback: (error: VoiceRecorderError) => void): void {
        ExpoSpeechRecognitionModule.addListener('error', (error) => {
            if (error.error === 'not-allowed') return;

            const voiceRecorderError = new VoiceRecorderError(
                error.message || this.appMessages.UNEXPECTED_ERROR,
                error.error
            );

            callback(voiceRecorderError);
        });
    }

    /**
     * Sets a callback to be called when the speech recognition session returns a result.
     *
     * @param {(value?: string) => void} callback - The callback to be called when the speech recognition session returns a result.
     * @returns {void} - This function does not return anything.
     */
    public onSpeechResults(callback: (value?: string) => void): void {
        ExpoSpeechRecognitionModule.addListener('result', (e) => {
            callback(e.results[0].transcript);
        });
    }

    /**
     * Sets a callback to be called when the speech recognition session is started.
     *
     * @param {() => void} callback - The callback to be called when the speech recognition session is started.
     * @returns {void} - This function does not return anything.
     */
    public onSpeechStart(callback: () => void): void {
        ExpoSpeechRecognitionModule.addListener('start', callback);
    }

    /**
     * Requests the record audio permission.
     *
     * @returns {Promise<PermissionStatus>} A promise that resolves with the current permission status for the 
     * record audio permission.
     */
    public async requestRecordAudioPermission(): Promise<PermissionStatus> {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        const isUndetermined = result.status === permissionsStatus.UNDETERMINED;

        if (result.granted) return permissionsStatus.GRANTED;
        if (isUndetermined) return permissionsStatus.UNDETERMINED;
        if (result.canAskAgain && !isUndetermined) return permissionsStatus.DENIED;
        if (!result.canAskAgain && !isUndetermined) return permissionsStatus.BLOCKED;

        return permissionsStatus.UNAVAILABLE;
    }

    /**
     * Starts a speech recognition session in the specified language.
     *
     * @param {SpeakerLanguageKey} lang - The language key for the speech recognition session.
     * @throws {VoiceRecorderError} If an error occurs while starting the session.
     */
    public startRecording(lang: SpeakerLanguageKey): void {
        try {
            const language = this.speakerLanguages[lang];
            ExpoSpeechRecognitionModule.start({ lang: language });
        }
        catch (error) {
            console.error(error);

            const voiceRecorderError = new VoiceRecorderError(
                (error as any).message || this.appMessages.UNEXPECTED_ERROR,
                (error as any).error
            );

            throw voiceRecorderError;
        }
    }

    /**
     * Stops the current speech recognition session.
     *
     * @throws {VoiceRecorderError} If an error occurs while stopping the session.
     */
    public stopRecording(): void {
        try {
            ExpoSpeechRecognitionModule.stop();
        }
        catch (error) {
            console.error(error);

            const voiceRecorderError = new VoiceRecorderError(
                (error as any).message || this.appMessages.UNEXPECTED_ERROR,
                (error as any).error
            );

            throw voiceRecorderError;
        }
    }
}