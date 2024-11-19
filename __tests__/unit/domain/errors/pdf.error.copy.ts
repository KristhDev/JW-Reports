import { PDFError } from '@domain/errors';

describe('Test in PDFError', () => {
    it('should have respective methods and properties', () => {
        const error = new PDFError('PDF not generated');

        expect(error.message).toBe('PDF not generated');
        expect(error.name).toBe('PDFError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(PDFError);
    });
});