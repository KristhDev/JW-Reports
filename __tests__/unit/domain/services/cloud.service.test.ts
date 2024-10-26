/* Services */
import { CloudService } from '@domain/services';

describe('Test in CloudService', () => {
    it('should have respective methods', () => {
        expect(CloudService).toHaveProperty('deleteImage');
        expect(typeof CloudService.deleteImage).toBe('function');

        expect(CloudService).toHaveProperty('uploadImage');
        expect(typeof CloudService.uploadImage).toBe('function');
    });
});