import RNFS from 'react-native-fs';

/* Errors */
import { FileSystemError } from '@domain/errors';

/* Adapters */
import { FileSystem } from '@infrasturcture/adapters';

describe('Test in FileSystem adapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have respective properties and methods', () => {
        expect(FileSystem).toHaveProperty('downloadDir');
        expect(typeof FileSystem.downloadDir).toBe('string');

        expect(FileSystem).toHaveProperty('moveFile');
        expect(typeof FileSystem.moveFile).toBe('function');
    });

    it('should move a file', async () => {
        const from = 'path/from/file.txt';
        const to = 'path/to/file.txt';

        await FileSystem.moveFile({ from, to });

        expect(RNFS.moveFile).toHaveBeenCalledTimes(1);
        expect(RNFS.moveFile).toHaveBeenCalledWith(from, to);
    });

    it('should faild move a file when throw a error', async () => {
        (RNFS.moveFile as jest.Mock).mockRejectedValueOnce(new Error('Path to move file not found'));
        const from = 'path/from/file.txt';
        const to = 'path/to/file.txt';

        try {
            await FileSystem.moveFile({ from, to });
        }
        catch (error) {
            expect(RNFS.moveFile).toHaveBeenCalledTimes(1);
            expect(RNFS.moveFile).toHaveBeenCalledWith(from, to);

            expect(error).toBeInstanceOf(FileSystemError);
            expect(error).toHaveProperty('message', 'Path to move file not found');
        }
    });
});