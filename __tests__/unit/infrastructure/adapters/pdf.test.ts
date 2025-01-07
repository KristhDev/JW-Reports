import * as Print from 'expo-print';

/* Mocks */
import { InternalStorageSpy } from '@mocks';

/* Errors */
import { PDFError } from '@domain/errors';

/* Adapters */
import { PDF } from '@infrasturcture/adapters';

describe('Test in PDF adapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have respective methods', () => {
        expect(PDF).toHaveProperty('writeFromHTML');
        expect(typeof PDF.writeFromHTML).toBe('function');
    });

    it('should return a path to the saved PDF file - writeFromHTML', async () => {
        const filePath = '/storage/emulated/0/Download/path/to/directory/file-name.pdf';
        const pdfPath = '/storage/emulated/0/Download/path/to/directory/PDF-name.pdf';

        (Print.printAsync as jest.Mock).mockResolvedValueOnce({ uri: filePath });
        InternalStorageSpy.rename.mockResolvedValueOnce();

        const fileName = 'PDF-name';
        const html = '<html><body>HTML</body></html>';

        const path = await PDF.writeFromHTML({ fileName, html });
        expect(path).toBe(pdfPath);

        expect(Print.printAsync).toHaveBeenCalledTimes(1);
        expect(Print.printAsync).toHaveBeenCalledWith({ html });
    });

    it('should faild write a PDF file when throw a error - writeFromHTML', async () => {
        (Print.printAsync as jest.Mock).mockRejectedValueOnce(new Error('Permission denied'));

        const fileName = 'file-name.pdf';
        const html = '<html><body>HTML</body></html>';

        try {
            await PDF.writeFromHTML({ fileName, html });
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(PDFError);
            expect(error).toHaveProperty('message', 'Permission denied');

            expect(Print.printAsync).toHaveBeenCalledTimes(1);
            expect(Print.printAsync).toHaveBeenCalledWith({ html });
        }
    });

    it('should faild becuase rename throws an error - writeFromHTML', async () => {
        const filePath = '/storage/emulated/0/Download/path/to/directory/file-name.pdf';
        const fileName = 'file-name.pdf';
        const html = '<html><body>HTML</body></html>';

        (Print.printAsync as jest.Mock).mockResolvedValueOnce({ uri: filePath });
        InternalStorageSpy.rename.mockRejectedValueOnce(new Error('Path to move file not found'));

        try {
            await PDF.writeFromHTML({ fileName, html });
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(PDFError);
            expect(error).toHaveProperty('message', 'Path to move file not found');

            expect(Print.printAsync).toHaveBeenCalledTimes(1);
            expect(Print.printAsync).toHaveBeenCalledWith({ html });
        }
    });
});