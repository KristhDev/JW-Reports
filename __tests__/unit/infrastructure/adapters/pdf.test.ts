import RNHtmlToPdf from 'react-native-html-to-pdf';

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
        (RNHtmlToPdf.convert as jest.Mock).mockResolvedValueOnce({ filePath });

        const directory = 'path/to/directory';
        const fileName = 'file-name.pdf';
        const html = '<html><body>HTML</body></html>';

        const path = await PDF.writeFromHTML({ directory, fileName, html });
        expect(path).toBe(filePath);

        expect(RNHtmlToPdf.convert).toHaveBeenCalledTimes(1);
        expect(RNHtmlToPdf.convert).toHaveBeenCalledWith({ directory, fileName, html, width: 480 });
    });

    it('should faild write a PDF file when throw a error - writeFromHTML', async () => {
        (RNHtmlToPdf.convert as jest.Mock).mockRejectedValueOnce(new Error('Permission denied'));

        const directory = 'path/to/directory';
        const fileName = 'file-name.pdf';
        const html = '<html><body>HTML</body></html>';

        try {
            await PDF.writeFromHTML({ directory, fileName, html });
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(PDFError);
            expect(error).toHaveProperty('message', 'Permission denied');

            expect(RNHtmlToPdf.convert).toHaveBeenCalledTimes(1);
            expect(RNHtmlToPdf.convert).toHaveBeenCalledWith({ directory, fileName, html, width: 480 });
        }
    });
});