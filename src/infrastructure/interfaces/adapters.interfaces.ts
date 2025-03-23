import { InternalAdapterStorage } from '@infrastructure/adapters';

/**
 * Interface representing the options for moving a file from InternalStorage to ExternalStorage.
 * 
 * @property {string} filePath - The path to the file in InternalStorage.
 * @property {string} mimeType - The MIME type of the file.
 */
export interface MoveFileOptions {
    filePath: string;
    mimeType: string;
}

/**
 * Type representing the valid encoding values that can be used in InternalStorage.
 * This type is derived from the encodings object defined in InternalStorage.
 * 
 * @type {string} - The encoding value (e.g., 'utf8', 'ascii', etc.)
 */
export type EncodingValue = (typeof InternalAdapterStorage.encodings)[keyof typeof InternalAdapterStorage.encodings];

/**
 * Interface representing the options for renaming a file in InternalStorage.
 * 
 * @property {string} newName - The new name for the file.
 * @property {string} oldName - The old name of the file.
 * @property {string} path - The path to the directory where the file is located.
 */
export interface RenameOptions {
    newName: string;
    oldName: string;
    path: string;
}

/**
 * Interface representing the options for writing a PDF from HTML in PDF.
 * 
 * @property {string} fileName - The name of the PDF file.
 * @property {string} html - The HTML content to be converted to PDF.
 * @property {number} width - The width of the PDF page (optional).
 */
export interface WriteFromHtmlOptions {
    fileName: string;
    html: string;
    width?: number;
}