export class DtoError extends Error {

    constructor(
        public readonly message: string
    ) {
        super(message);
        this.name = 'DtoError';
    }
}