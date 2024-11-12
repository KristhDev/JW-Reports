export class DtoError extends Error {
    constructor(
        public readonly message: string
    ) {
        super(message);
        this.name = 'DtoError';
    }

    /**
     * Returns a JSON representation of the error.
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