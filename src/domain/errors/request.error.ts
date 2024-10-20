export class RequestError extends Error {
    constructor(
        public readonly message: string,
        public readonly status: number,
        public readonly code: string
    ) {
        super(message);
        this.name = 'RequestError';
    }
}