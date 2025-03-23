import * as FileSystem from 'expo-file-system';

/* Errors */
import { InternalStorageError } from '@domain/errors';

/* Interfaces */
import { EncodingValue, RenameOptions } from '@infrastructure/interfaces';

export class InternalAdapterStorage {
    public static encodings = {
        BASE64: FileSystem.EncodingType.Base64,
        UTF8: FileSystem.EncodingType.UTF8
    }

    /**
     * Deletes a file from internal storage.
     * 
     * @param {string} path - The path of the file to be deleted.
     * @returns {Promise<void>} A promise that resolves when the file is deleted successfully.
     * @throws {InternalStorageError} If there is an error deleting the file.
     */
    public static async deleteFile(path: string): Promise<void> {
        try {
            await FileSystem.deleteAsync(path);
        }
        catch (error) {
            const internalStorageError = new InternalStorageError((error as Error).message);
            console.error(internalStorageError);
            throw internalStorageError;
        }
    }

    /**
     * Reads a file from internal storage.
     * 
     * @param {string} path - The path of the file to be read.
     * @param {EncodingValue} encoding - The encoding to be used to read the file.
     * @returns {Promise<string>} The contents of the file as a string.
     * @throws {InternalStorageError} If a file operation error occurs.
     */
    public static async readFile(path: string, encoding: EncodingValue): Promise<string> {
        try {
            const file = await FileSystem.readAsStringAsync(path, { encoding });
            return file;
        }
        catch (error) {
            const internalStorageError = new InternalStorageError((error as Error).message);
            console.error(internalStorageError);
            throw internalStorageError;
        }
    }

    /**
     * Renames a file from one name to another.
     * @param {RenameOptions} options The options to rename the file.
     * @returns {Promise<void>}
     * @throws {InternalStorageError} If a file operation error occurs.
     */
    public static async rename({ newName, oldName, path }: RenameOptions): Promise<void> {
        try {
            await FileSystem.moveAsync({
                from: `${ path }/${ oldName }`,
                to: `${ path }/${ newName }`
            });
        }
        catch (error) {
            const internalStorageError = new InternalStorageError((error as Error).message);
            console.error(internalStorageError);
            throw internalStorageError;
        }
    }
}