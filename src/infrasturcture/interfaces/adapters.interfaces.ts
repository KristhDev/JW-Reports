import { InternalStorage } from '@infrasturcture/adapters';

export interface CopyFileOptions {
    filePath: string;
    mimeType: string;
}

export type EncodingValue = (typeof InternalStorage.encodings)[keyof typeof InternalStorage.encodings];

export interface RenameOptions {
    newName: string;
    oldName: string;
    path: string;
}

export interface WriteFromHtmlOptions {
    fileName: string;
    html: string;
    width?: number;
}