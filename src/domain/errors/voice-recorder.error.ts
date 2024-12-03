export class VoiceRecorderError extends Error {
    constructor(message: string, public readonly code: string) {
        super(message);
        this.name = 'VoiceRecorderError';
    }

    /**
     * Returns a JSON representation of the VoiceRecorderError.
     *
     * @returns An object with the following properties:
     * - `name`: The name of the error.
     * - `message`: The error message.
     */
    public toJson(): Record<string, any> {
        return {
            name: this.name,
            code: this.code,
            message: this.message
        }
    }
}