/* Services */
import { RevisitsService } from '@domain/services';

describe('Test in RevisitsService', () => {
    it('should to have respective methods', () => {
        expect(RevisitsService).toHaveProperty('complete');
        expect(typeof RevisitsService.complete).toBe('function');

        expect(RevisitsService).toHaveProperty('create');
        expect(typeof RevisitsService.create).toBe('function');

        expect(RevisitsService).toHaveProperty('delete');
        expect(typeof RevisitsService.delete).toBe('function');

        expect(RevisitsService).toHaveProperty('getAllByUserId');
        expect(typeof RevisitsService.getAllByUserId).toBe('function');

        expect(RevisitsService).toHaveProperty('getLastByUserId');
        expect(typeof RevisitsService.getLastByUserId).toBe('function');

        expect(RevisitsService).toHaveProperty('paginateByUserId');
        expect(typeof RevisitsService.paginateByUserId).toBe('function');

        expect(RevisitsService).toHaveProperty('update');
        expect(typeof RevisitsService.update).toBe('function');
    });
});