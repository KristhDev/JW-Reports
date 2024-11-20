/* Templates */
import { PdfCoursesTemplate } from '@domain/templates';

export const PdfCoursesTemplateSpy = {
    generate: jest.spyOn(PdfCoursesTemplate, 'generate')
}