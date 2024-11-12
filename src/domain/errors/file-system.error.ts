export class FileSystemError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FileSystemError';
    }

    /**
     * Returns a JSON representation of the file system error.
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