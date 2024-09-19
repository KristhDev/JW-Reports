import { characters } from '@utils';

describe('Test in characters util', () => {
    it('should have respective methods', () => {
        expect(characters).toEqual({
            capitalize: expect.any(Function),
            truncate: expect.any(Function)
        });
    });

    it('should capitalize a string - capitalize', () => {
        const greet = 'hello world';
        const greetCapitalized = 'Hello world';

        const result = characters.capitalize(greet);
        expect(result).toBe(greetCapitalized);
    });

    it('should truncate a string - truncate', () => {
        const greet = 'hello world';
        const greetTruncated = 'hello w...';

        const result = characters.truncate(greet, 7);
        expect(result).toBe(greetTruncated);
    });
});