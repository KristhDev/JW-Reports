import { RequestError } from '@domain/errors';

describe('Test in RequestError', () => {
    it('should render properties in error instance', () => {
        const error = new RequestError('Resource not found', 404, 'RESOURCE_NOT_FOUND');

        expect(error.code).toBe('RESOURCE_NOT_FOUND');
        expect(error.message).toBe('Resource not found');
        expect(error.name).toBe('RequestError');
        expect(error.status).toBe(404);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(RequestError);
    });
});