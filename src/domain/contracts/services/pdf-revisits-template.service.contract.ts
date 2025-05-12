import { RevisitsTemplateOptions } from '@infrastructure/interfaces';

export abstract class PdfRevisitsTemplateServiceContract {
    public abstract generate(options: RevisitsTemplateOptions): Promise<string>;
}