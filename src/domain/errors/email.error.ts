export class EmailError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EmailError';
    }
}