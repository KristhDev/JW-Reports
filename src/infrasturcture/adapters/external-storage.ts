import { StorageAccessFramework, EncodingType } from 'expo-file-system';

/* Constants */
import { permissionsMessages } from '@application/constants';

/* Errors */
import { ExternalStorageError } from '@domain/errors';

/* Interfaces */
import { MoveFileOptions } from '@infrasturcture/interfaces';

/* Adapters */
import { InternalStorage } from './internal-storage';

export class ExternalStorage {
    public static encodings = {
        BASE64: EncodingType.Base64,
        UTF8: EncodingType.UTF8
    }

    /**
     * Moves a file from InternalStorage to ExternalStorage.
     * 
     * @param {MoveFileOptions} options - The options for moving the file.
     * @returns {Promise<void>} A promise that resolves when the file is moved successfully.
     * @throws {ExternalStorageError} If there is an error moving the file.
     */
    public static async moveFileOfInternalExtorage({ filePath, mimeType }: MoveFileOptions): Promise<void> {
        try {
            const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permission.granted) throw ExternalStorageError.permissionDenied(permissionsMessages.FILE_EXPORT_DENIED)

            const fileName = filePath.split('/').slice(-1)[0];
            const fileContent = await InternalStorage.readFile(filePath, InternalStorage.encodings.BASE64);

            const fileInExternalStorageUri = await StorageAccessFramework.createFileAsync(
                permission.directoryUri,
                fileName,
                mimeType
            );

            await StorageAccessFramework.writeAsStringAsync(fileInExternalStorageUri, fileContent, {
                encoding: ExternalStorage.encodings.BASE64
            });
        }
        catch (error) {
            if (error instanceof ExternalStorageError) throw error;

            const externalStorageError = new ExternalStorageError((error as Error).message);
            console.error(externalStorageError);
            throw externalStorageError;
        }
        finally {
            await InternalStorage.deleteFile(filePath);
        }
    }
}