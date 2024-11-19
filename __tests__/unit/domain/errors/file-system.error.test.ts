import { FileSystemError } from '@domain/errors';

describe('Test in FileSystemError', () => {
    it('should have respective methods and properties', () => {
        const error = new FileSystemError('Image not found');

        expect(error.message).toBe('Image not stored');
        expect(error.name).toBe('FileSystemError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(FileSystemError);
    });
});