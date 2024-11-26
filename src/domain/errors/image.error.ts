export class ImageError extends Error {
    constructor(
        message: string,
        public readonly code?: string
    ) {
        super(message);
        this.name = 'ImageError';
    }

    /**
     * Returns a JSON representation of the image error.
     *
     * @returns An object with the following properties:
     * - `name`: The name of the error.
     * - `message`: The error message.
     */
    public toJson(): Record<string, any> {
        return {
            name: this.name,
            message: this.message,
            code: this.code
        }
    }
}