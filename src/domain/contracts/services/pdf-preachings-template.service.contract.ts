import { PreachingsTemplateOptions } from '@infrastructure/interfaces';

export abstract class PdfPreachingsTemplateServiceContract {
    public abstract generate(options: PreachingsTemplateOptions): string;
}