/* Templates */
import { PdfCoursesTemplate } from '@domain/templates';

describe('Test in PdfCoursesTemplate', () => {
    it('should have respective methods', () => {
        expect(PdfCoursesTemplate).toHaveProperty('generate');
        expect(typeof PdfCoursesTemplate.generate).toBe('function');
    });
});