import { WriteFromHtmlOptions } from '@infrastructure/interfaces';

export abstract class PDFAdapterContract {
    public abstract writeFromHTML(options: WriteFromHtmlOptions): Promise<string>;
}