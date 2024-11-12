import Voice from '@react-native-voice/voice';

/* Constants */
import { appMessages } from '@application/constants';

/* Errors */
import { VoiceRecorderError } from '@domain/errors';

export class VoiceRecorder {
    /**
     * Destroys the current speech recognition session and removes all event listeners.
     *
     * @returns {Promise<void>} A promise that resolves when the speech recognition session is destroyed.
     * @throws {VoiceRecorderError} An error occurred while trying to destroy the speech recognition session.
     */
    public static async destroyListeners(): Promise<void> {
        try {
            await Voice.destroy();
            Voice.removeAllListeners();
        }
        catch (error) {
            console.error(error);
            const voiceRecorderError = new VoiceRecorderError((error as Error).message || appMessages.UNEXPECTED_ERROR);
            throw voiceRecorderError;
        }
    }

    /**
     * Sets a callback to be called when the speech recognition session is ended.
     *
     * @param {() => void} callback - The callback to be called when the speech recognition session is ended.
     * @returns {void} - This function does not return anything.
     */
    public static onSpeechEnd(callback: () => void): void {
        Voice.onSpeechEnd = callback;
    }

    /**
     * Sets a callback to be called when an error occurs in the speech recognition session.
     *
     * @param {(error: VoiceRecorderError) => void} callback - The callback to be called when an error occurs in the speech recognition session.
     * @returns {void} - This function does not return anything.
     */
    public static onSpeechError(callback: (error: VoiceRecorderError) => void): void {
        Voice.onSpeechError = (e) => {
            console.error(e.error);
            const error = new VoiceRecorderError(e.error?.message || appMessages.UNEXPECTED_ERROR);
            callback(error);
        }
    }

    /**
     * Sets a callback to be called when the speech recognition session returns a result.
     *
     * @param {(value?: string) => void} callback - The callback to be called when the speech recognition session returns a result.
     * @returns {void} - This function does not return anything.
     */
    public static onSpeechResults(callback: (value?: string) => void): void {
        Voice.onSpeechResults = (e) => {
            callback(e.value && e.value[0]);
        }
    }

    /**
     * Sets a callback to be called when the speech recognition session is started.
     *
     * @param {() => void} callback - The callback to be called when the speech recognition session is started.
     * @returns {void} - This function does not return anything.
     */
    public static onSpeechStart(callback: () => void): void {
        Voice.onSpeechStart = callback;
    }

    /**
     * Starts a speech recognition session in the given language.
     *
     * @param {string} lang - The language code to use for the speech recognition session.
     * @returns {Promise<void>} A promise that resolves when the speech recognition session is started.
     * @throws {VoiceRecorderError} An error occurred while trying to start the speech recognition session.
     */
    public static async startRecording(lang: string): Promise<void> {
        try {
            await Voice.start(lang);
        }
        catch (error) {
            console.error(error);
            const voiceRecorderError = new VoiceRecorderError((error as Error).message || appMessages.UNEXPECTED_ERROR);
            throw voiceRecorderError;
        }
    }

    /**
     * Stops the current speech recognition session.
     *
     * @returns {Promise<void>} A promise that resolves when the speech recognition session is stopped.
     * @throws {VoiceRecorderError} An error occurred while trying to stop the speech recognition session.
     */
    public static async stopRecording(): Promise<void> {
        try {
            await Voice.stop();
        }
        catch (error) {
            console.error(error);
            const voiceRecorderError = new VoiceRecorderError((error as Error).message || appMessages.UNEXPECTED_ERROR);
            throw voiceRecorderError;
        }
    }
}