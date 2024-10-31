import RNFS from 'react-native-fs';

/* Errors */
import { FileSystemError } from '@domain/errors';

/* Interfaces */
import { MoveFileOptions } from '@infrasturcture/interfaces';

export class FileSystem {
    public static downloadDir = RNFS.DownloadDirectoryPath;

    /**
     * Moves a file from one location to another.
     * @param {string} from The initial file path.
     * @param {string} to The destination file path.
     * @returns {Promise<void>}
     * @throws {Error} If a file operation error occurs.
     */
    public static async moveFile({ from, to }: MoveFileOptions): Promise<void> {
        try {
            await RNFS.moveFile(from, to);
        }
        catch (error) {
            const fileSystemError = new FileSystemError((error as Error).message);
            console.error(fileSystemError);
            throw fileSystemError;
        }
    }
}