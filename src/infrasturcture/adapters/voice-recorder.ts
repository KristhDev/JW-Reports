import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';

/* Constants */
import { appMessages } from '@application/constants';

/* Errors */
import { VoiceRecorderError } from '@domain/errors';

export class VoiceRecorder {
    /**
     * Destroys all listeners for speech recognition events.
     *
     * @returns {void} - This function does not return anything.
     */
    public static destroyListeners(): void {
        ExpoSpeechRecognitionModule.removeAllListeners('start');
        ExpoSpeechRecognitionModule.removeAllListeners('end');
        ExpoSpeechRecognitionModule.removeAllListeners('result');
        ExpoSpeechRecognitionModule.removeAllListeners('error');
    }

    /**
     * Sets a callback to be called when the speech recognition session is ended.
     *
     * @param {() => void} callback - The callback to be called when the speech recognition session is ended.
     * @returns {void} - This function does not return anything.
     */
    public static onSpeechEnd(callback: () => void): void {
        ExpoSpeechRecognitionModule.addListener('end', callback);
    }

    /**
     * Sets a callback to be called when an error occurs in the speech recognition session.
     *
     * @param {(error: VoiceRecorderError) => void} callback - The callback to be called when an error occurs in the speech recognition session.
     * @returns {void} - This function does not return anything.
     */
    public static onSpeechError(callback: (error: VoiceRecorderError) => void): void {
        ExpoSpeechRecognitionModule.addListener('error', (error) => {
            const voiceRecorderError = new VoiceRecorderError(
                error.message || appMessages.UNEXPECTED_ERROR,
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
    public static onSpeechResults(callback: (value?: string) => void): void {
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
    public static onSpeechStart(callback: () => void): void {
        ExpoSpeechRecognitionModule.addListener('start', callback);
    }

    /**
     * Starts a speech recognition session in the specified language.
     *
     * @param {string} lang - The language code for the speech recognition session.
     * @throws {VoiceRecorderError} If an error occurs while starting the session.
     */
    public static startRecording(lang: string): void {
        try {
            ExpoSpeechRecognitionModule.start({ lang });
        }
        catch (error) {
            console.error(error);

            const voiceRecorderError = new VoiceRecorderError(
                (error as any).message || appMessages.UNEXPECTED_ERROR,
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
    public static stopRecording(): void {
        try {
            ExpoSpeechRecognitionModule.stop();
        }
        catch (error) {
            console.error(error);

            const voiceRecorderError = new VoiceRecorderError(
                (error as any).message || appMessages.UNEXPECTED_ERROR,
                (error as any).error
            );

            throw voiceRecorderError;
        }
    }
}