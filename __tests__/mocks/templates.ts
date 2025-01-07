/* Templates */
import { PdfCoursesTemplate, PdfPreachingsTemplate, PdfRevisitsTemplate } from '@domain/templates';

export const PdfCoursesTemplateSpy = {
    generate: jest.spyOn(PdfCoursesTemplate, 'generate')
}

export const PdfPreachingsTemplateSpy = {
    generate: jest.spyOn(PdfPreachingsTemplate, 'generate')
}

export const PdfRevisitsTemplateSpy = {
    generate: jest.spyOn(PdfRevisitsTemplate, 'generate')
}