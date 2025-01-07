import { ExternalStorageError } from '@domain/errors';

describe('Test in ExternalStorageError', () => {
    it('should have respective methods and properties', () => {
        const error = new ExternalStorageError('File not found');

        expect(error.message).toBe('File not found');
        expect(error.name).toBe('ExternalStorageError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ExternalStorageError);
    });
});