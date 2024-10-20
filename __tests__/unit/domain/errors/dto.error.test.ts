import { DtoError } from '@domain/errors';

describe('Test in DtoError', () => {
    it('should have respective methods and properties', () => {
        const error = new DtoError('Property is missing');

        expect(error.message).toBe('Property is missing');
        expect(error.name).toBe('DtoError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(DtoError);
    });
});