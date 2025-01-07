import { CloudError } from '@domain/errors';

describe('Test in CloudError', () => {
    it('should have respective methods and properties', () => {
        const error = new CloudError('Image not stored', 400);

        expect(error.message).toBe('Image not stored');
        expect(error.name).toBe('CloudError');
        expect(error.status).toBe(400);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(CloudError);
    });
});