import { Characters } from '@utils';

describe('Test in characters util', () => {
    it('should have respective methods', () => {
        expect(Characters).toHaveProperty('capitalize');
        expect(typeof Characters.capitalize).toBe('function');
        expect(Characters).toHaveProperty('truncate');
        expect(typeof Characters.truncate).toBe('function');
    });

    it('should capitalize a string - capitalize', () => {
        const greet = 'hello world';
        const greetCapitalized = 'Hello world';

        const result = Characters.capitalize(greet);
        expect(result).toBe(greetCapitalized);
    });

    it('should truncate a string - truncate', () => {
        const greet = 'hello world';
        const greetTruncated = 'hello w...';

        const result = Characters.truncate(greet, 7);
        expect(result).toBe(greetTruncated);
    });
});