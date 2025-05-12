import { CoursesTemplateOptions } from '@infrastructure/interfaces';

export abstract class PdfCoursesTemplateServiceContract {
    public abstract generate(options: CoursesTemplateOptions): string;
}