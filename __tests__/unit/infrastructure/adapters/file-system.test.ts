import * as FileSystem from 'expo-file-system'

/* Errors */
import { InternalStorageError } from '@domain/errors';

/* Adapters */
import { InternalStorage } from '@infrasturcture/adapters';

describe('Test in FileSystem adapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have respective properties and methods', () => {
        expect(InternalStorage).toHaveProperty('encodings');
        expect(typeof InternalStorage.encodings).toBe('object');

        expect(InternalStorage).toHaveProperty('deleteFile');
        expect(typeof InternalStorage.deleteFile).toBe('function');

        expect(InternalStorage).toHaveProperty('readFile');
        expect(typeof InternalStorage.readFile).toBe('function');

        expect(InternalStorage).toHaveProperty('rename');
        expect(typeof InternalStorage.rename).toBe('function');
    });

    it('should delete a file - deleteFile', async () => {
        const path = '/storage/emulated/0/Download/path/to/directory/file-name.pdf';
        (FileSystem.deleteAsync as jest.Mock).mockImplementationOnce(() => Promise.resolve());

        await InternalStorage.deleteFile(path);

        expect(FileSystem.deleteAsync).toHaveBeenCalledTimes(1);
        expect(FileSystem.deleteAsync).toHaveBeenCalledWith(path);
    });

    it('should faild delete a file when throw a error - deleteFile', async () => {
        const path = '/storage/emulated/0/Download/path/to/directory/file-name.pdf';
        (FileSystem.deleteAsync as jest.Mock).mockRejectedValueOnce(new Error('File not found'));

        try {
            await InternalStorage.deleteFile(path);
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(InternalStorageError);
            expect(error).toHaveProperty('message', 'File not found');

            expect(FileSystem.deleteAsync).toHaveBeenCalledTimes(1);
            expect(FileSystem.deleteAsync).toHaveBeenCalledWith(path);
        }
    });

    it('should read a file - readFile', async () => {
        const path = '/storage/emulated/0/Download/path/to/directory/file-name.pdf';
        const encoding = InternalStorage.encodings.BASE64;

        const dataOfFile = 'data-base64-string';

        (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValueOnce(dataOfFile);
        const file = await InternalStorage.readFile(path, encoding);

        expect(file).toBe(dataOfFile);

        expect(FileSystem.readAsStringAsync).toHaveBeenCalledTimes(1);
        expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(path, { encoding });
    });

    it('should faild read a file when throw a error - readFile', async () => {
        const path = '/storage/emulated/0/Download/path/to/directory/file-name.pdf';
        const encoding = InternalStorage.encodings.BASE64;

        (FileSystem.readAsStringAsync as jest.Mock).mockRejectedValueOnce(new Error('File not found'));

        try {
            await InternalStorage.readFile(path, encoding);
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(InternalStorageError);
            expect(error).toHaveProperty('message', 'File not found');

            expect(FileSystem.readAsStringAsync).toHaveBeenCalledTimes(1);
            expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(path, { encoding });
        }
    });

    it('should rename a file - rename', async () => {
        const path = '/storage/emulated/0/Download/path/to/directory';
        const newName = 'new-file-name.pdf';
        const oldName = 'file-name.pdf';

        await InternalStorage.rename({ newName, oldName, path });

        expect(FileSystem.moveAsync).toHaveBeenCalledTimes(1);
        expect(FileSystem.moveAsync).toHaveBeenCalledWith({
            from: `${ path }/${ oldName }`,
            to: `${ path }/${ newName }`
        });
    });

    it('should faild rename a file when throw a error - rename', async () => {
        const path = '/storage/emulated/0/Download/path/to/directory';
        const newName = 'new-file-name.pdf';
        const oldName = 'file-name.pdf';

        (FileSystem.moveAsync as jest.Mock).mockRejectedValueOnce(new Error('Path to move file not found'));

        try {
            await InternalStorage.rename({ newName, oldName, path });
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(InternalStorageError);
            expect(error).toHaveProperty('message', 'Path to move file not found');

            expect(FileSystem.moveAsync).toHaveBeenCalledTimes(1);
            expect(FileSystem.moveAsync).toHaveBeenCalledWith({
                from: `${ path }/${ oldName }`,
                to: `${ path }/${ newName }`
            });
        }
    });
});