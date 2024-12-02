import { StorageAccessFramework, EncodingType } from 'expo-file-system';

/* Errors */
import { ExternalStorageError } from '@domain/errors';

/* Interfaces */
import { CopyFileOptions } from '@infrasturcture/interfaces';

/* Adapters */
import { InternalStorage } from './internal-storage';

export class ExternalStorage {
    public static encodings = {
        BASE64: EncodingType.Base64,
        UTF8: EncodingType.UTF8
    }

    public static async moveFileOfInternalExtorage({ filePath, mimeType }: CopyFileOptions): Promise<void> {
        try {
            const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permission.granted) throw new Error('Permiso denegado para exportar el archivo.');

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
            const externalStorageError = new ExternalStorageError((error as Error).message);
            console.error(externalStorageError);
            throw externalStorageError;
        }
        finally {
            await InternalStorage.deleteFile(filePath);
        }
    }
}