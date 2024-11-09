export class VoiceRecorderError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'VoiceRecorderError';
    }
}