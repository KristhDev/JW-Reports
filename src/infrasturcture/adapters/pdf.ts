import * as Print from 'expo-print';

/* Errors */
import { PDFError } from '@domain/errors';

/* Interfaces */
import { WriteFromHtmlOptions } from '@infrasturcture/interfaces';

/* Adapters */
import { InternalStorage } from './internal-storage';

export class PDF {
    /**
     * Writes a PDF from the given HTML to the given file in the given directory.
     *
     * @param {WriteFromHtmlOptions} options The options to write the PDF.
     * @returns {Promise<string>} The path to the saved PDF file.
     */
    public static async writeFromHTML({ fileName, html, width }: WriteFromHtmlOptions): Promise<string> {
        try {
            const result = await Print.printToFileAsync({ html, width });

            const path = result.uri.split('/').slice(0, -1).join('/');
            const oldFileName = result.uri.split('/').slice(-1)[0];
            const newPath = `${ path }/${ fileName }.pdf`;

            await InternalStorage.rename({ newName: `${ fileName }.pdf`, oldName: oldFileName, path });

            return newPath;
        }
        catch (error) {
            const pdfError = new PDFError((error as Error).message);
            console.error(pdfError);
            throw pdfError;
        }
    }
}