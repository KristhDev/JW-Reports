/* Services */
import { PreachingService } from '@domain/services';

describe('Test in PreachingService', () => {
    it('should to have respective methods', () => {
        expect(PreachingService).toHaveProperty('create');
        expect(typeof PreachingService.create).toBe('function');

        expect(PreachingService).toHaveProperty('delete');
        expect(typeof PreachingService.delete).toBe('function');

        expect(PreachingService).toHaveProperty('getByUserIdAndMonth');
        expect(typeof PreachingService.getByUserIdAndMonth).toBe('function');

        expect(PreachingService).toHaveProperty('getAllByUserId');
        expect(typeof PreachingService.getAllByUserId).toBe('function');

        expect(PreachingService).toHaveProperty('update');
        expect(typeof PreachingService.update).toBe('function');
    });
});