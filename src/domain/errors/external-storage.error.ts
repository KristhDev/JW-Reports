export class ExternalStorageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExternalStorageError';
    }

    /**
     * Returns a JSON representation of the external storage error.
     *
     * @returns An object with the following properties:
     * - `name`: The name of the error.
     * - `message`: The error message.
     */
    public toJson(): Record<string, any> {
        return {
            name: this.name,
            message: this.message
        }
    }
}