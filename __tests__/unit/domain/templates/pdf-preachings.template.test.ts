/* Mocks */
import { preachingReportsMock } from '@mocks';

/* Templates */
import { PdfPreachingsTemplate } from '@domain/templates';

describe('Test in PdfPreachingsTemplate', () => {
    it('should have respective methods', () => {
        expect(PdfPreachingsTemplate).toHaveProperty('generate');
        expect(typeof PdfPreachingsTemplate.generate).toBe('function');
    });

    it('should generate a pdf template string', () => {
        const template = PdfPreachingsTemplate.generate({ fullName: 'John Doe', reports: preachingReportsMock });

        expect(typeof template).toBe('string');
        expect(template).toContain('John Doe');
    });
});