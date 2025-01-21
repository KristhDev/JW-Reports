export class ExternalStorageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExternalStorageError';
    }

    /**
     * Creates an ExternalStorageError with the given message when the user
     * denied the permission to access the external storage.
     *
     * @param {string} message - The error message.
     * @returns {ExternalStorageError} The ExternalStorageError.
     */
    public static permissionDenied(message: string): ExternalStorageError {
        return new ExternalStorageError(message);
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