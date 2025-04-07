import { StorageAccessFramework } from 'expo-file-system';

/* Constants */
import { fileEncodings } from '@application/constants/utils/adapters.util';

/* Contracts */
import { ExternalStorageAdapterContract, InternalStorageAdapterContract } from '@domain/contracts/adapters';
import { MessagesServiceContract } from '@domain/contracts/services';

/* Errors */
import { ExternalStorageError } from '@domain/errors';

/* Interfaces */
import { MoveFileOptions, PermissionsMessages } from '@infrastructure/interfaces';

export class ExternalStorageAdapter implements ExternalStorageAdapterContract {
    private readonly permissionsMessages: PermissionsMessages;

    constructor (
        private readonly messagesService: MessagesServiceContract,
        private readonly internalStorageAdapter: InternalStorageAdapterContract
    ) {
        this.permissionsMessages = this.messagesService.permissionsMessages;
    }

    /**
     * Moves a file from InternalStorage to ExternalStorage.
     * 
     * @param {MoveFileOptions} options - The options for moving the file.
     * @returns {Promise<void>} A promise that resolves when the file is moved successfully.
     * @throws {ExternalStorageError} If there is an error moving the file.
     */
    public async moveFileOfInternalExtorage({ filePath, mimeType }: MoveFileOptions): Promise<void> {
        try {
            const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permission.granted) throw ExternalStorageError.permissionDenied(this.permissionsMessages.FILE_EXPORT_DENIED)

            const fileName = filePath.split('/').slice(-1)[0];
            const fileContent = await this.internalStorageAdapter.readFile(filePath, fileEncodings.BASE64);

            const fileInExternalStorageUri = await StorageAccessFramework.createFileAsync(
                permission.directoryUri,
                fileName,
                mimeType
            );

            await StorageAccessFramework.writeAsStringAsync(fileInExternalStorageUri, fileContent, {
                encoding: fileEncodings.BASE64
            });
        }
        catch (error) {
            if (error instanceof ExternalStorageError) throw error;

            const externalStorageError = new ExternalStorageError((error as Error).message);
            console.error(externalStorageError);
            throw externalStorageError;
        }
        finally {
            await this.internalStorageAdapter.deleteFile(filePath);
        }
    }
}