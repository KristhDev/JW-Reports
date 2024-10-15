export class RequestError extends Error {
    constructor(
        public readonly message: string,
        public readonly status: number
    ) {
        super(message);
        this.name = 'HttpError';
    }
}