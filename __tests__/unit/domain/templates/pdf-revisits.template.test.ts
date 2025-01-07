/* Mocks */
import { revisitsMock } from '@mocks';

/* Templates */
import { PdfRevisitsTemplate } from '@domain/templates';

describe('Test in PdfRevisitsTemplate', () => {
    it('should have respective methods', () => {
        expect(PdfRevisitsTemplate).toHaveProperty('generate');
        expect(typeof PdfRevisitsTemplate.generate).toBe('function');
    });

    it('should generate a pdf template string', async () => {
        const template = await PdfRevisitsTemplate.generate({ fullName: 'John Doe', revisits: revisitsMock });

        expect(typeof template).toBe('string');
        expect(template).toContain('John Doe');
    });
});