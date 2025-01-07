/* Mocks */
import { coursesWithLessonsMock } from '@mocks';

/* Templates */
import { PdfCoursesTemplate } from '@domain/templates';

describe('Test in PdfCoursesTemplate', () => {
    it('should have respective methods', () => {
        expect(PdfCoursesTemplate).toHaveProperty('generate');
        expect(typeof PdfCoursesTemplate.generate).toBe('function');
    });

    it('should generate a pdf template string', () => {
        const template = PdfCoursesTemplate.generate({ fullName: 'John Doe', courses: coursesWithLessonsMock });

        expect(typeof template).toBe('string');
        expect(template).toContain('John Doe');
    });
});