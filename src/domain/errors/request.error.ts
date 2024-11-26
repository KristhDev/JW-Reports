export class RequestError extends Error {
    constructor(
        public readonly message: string,
        public readonly status: number,
        public readonly code: string
    ) {
        super(message);
        this.name = 'RequestError';
    }

    /**
     * Returns a JSON representation of the request error.
     *
     * @returns An object with the following properties:
     * - `name`: The name of the error.
     * - `message`: The error message.
     * - `status`: The HTTP status code of the request.
     * - `code`: The error code.
     */
    public toJson(): Record<string, any> {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            code: this.code
        }
    }
}