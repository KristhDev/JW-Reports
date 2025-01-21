/* Constants */
import { permissionsMessages } from '@application/constants';

/* Errors */
import { ExternalStorageError } from '@domain/errors';

describe('Test in ExternalStorageError', () => {
    it('should have respective methods and properties', () => {
        expect(ExternalStorageError).toHaveProperty('permissionDenied');
        expect(ExternalStorageError.permissionDenied).toBeInstanceOf(Function);

        const error = new ExternalStorageError('File not found');

        expect(error.message).toBe('File not found');
        expect(error.name).toBe('ExternalStorageError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ExternalStorageError);
    });

    it('should create a new instance of ExternalStorageError with permissionDenied', () => {
        const error = ExternalStorageError.permissionDenied(permissionsMessages.FILE_EXPORT_DENIED);

        expect(error.message).toBe(permissionsMessages.FILE_EXPORT_DENIED);
        expect(error.name).toBe('ExternalStorageError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ExternalStorageError);
    });
});