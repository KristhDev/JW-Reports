export class PDFError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PDFError';
    }
}