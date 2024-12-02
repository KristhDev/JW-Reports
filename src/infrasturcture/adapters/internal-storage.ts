import * as FileSystem from 'expo-file-system';

/* Errors */
import { InternalStorageError } from '@domain/errors';

/* Interfaces */
import { EncodingValue, RenameOptions } from '@infrasturcture/interfaces';

export class InternalStorage {
    public static encodings = {
        BASE64: FileSystem.EncodingType.Base64,
        UTF8: FileSystem.EncodingType.UTF8
    }

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