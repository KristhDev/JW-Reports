import { ImageError } from '@domain/errors';

describe('Test in ImageError', () => {
    it('should render properties in error instance', () => {
        const error = new ImageError('Image not stored');

        expect(error.message).toBe('Image not stored');
        expect(error.name).toBe('ImageError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ImageError);
    });
});