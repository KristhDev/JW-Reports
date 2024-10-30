import RNHTMLtoPDF from 'react-native-html-to-pdf';

/* Interfaces */
import { WriteFromHtmlOptions } from '@infrasturcture/interfaces';

export class PDF {
    /**
     * Writes a PDF from the given HTML to the given file in the given directory.
     *
     * @param {WriteFromHtmlOptions} options The options to write the PDF.
     * @returns {Promise<string>} The path to the saved PDF file.
     */
    public static async writeFromHTML({ directory, fileName, html, width = 480 }: WriteFromHtmlOptions): Promise<string> {
        try {
            const pdf = await RNHTMLtoPDF.convert({ directory, fileName, html, width });
            return pdf.filePath!;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}