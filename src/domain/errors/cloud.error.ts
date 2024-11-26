export class CloudError extends Error {
    constructor(
        message: string,
        public readonly status: number
    ) {
        super(message);
        this.name = 'CloudError';
    }

    /**
     * Returns a JSON representation of the error.
     *
     * @returns An object with the following properties:
     * - `name`: The name of the error.
     * - `message`: The error message.
     * - `status`: The HTTP status code of the request.
     */
    public toJson(): Record<string, any> {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        }
    }
}