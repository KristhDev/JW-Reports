import { InternalStorageError } from '@domain/errors';

describe('Test in InternalStorageError', () => {
    it('should have respective methods and properties', () => {
        const error = new InternalStorageError('File not found');

        expect(error.message).toBe('File not found');
        expect(error.name).toBe('InternalStorageError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(InternalStorageError);
    });
});