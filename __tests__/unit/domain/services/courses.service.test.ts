/* Services */
import { CoursesService } from '@domain/services';

describe('Test in CoursesService', () => {
    it('should have respective methods', () => {
        expect(CoursesService).toHaveProperty('activeOrSuspend');
        expect(typeof CoursesService.activeOrSuspend).toBe('function');

        expect(CoursesService).toHaveProperty('create');
        expect(typeof CoursesService.create).toBe('function');

        expect(CoursesService).toHaveProperty('delete');
        expect(typeof CoursesService.delete).toBe('function');

        expect(CoursesService).toHaveProperty('finishOrStart');
        expect(typeof CoursesService.finishOrStart).toBe('function');

        expect(CoursesService).toHaveProperty('getAllByUserId');
        expect(typeof CoursesService.getAllByUserId).toBe('function');

        expect(CoursesService).toHaveProperty('getCourseIdsByUserId');
        expect(typeof CoursesService.getCourseIdsByUserId).toBe('function');

        expect(CoursesService).toHaveProperty('paginateByUserId');
        expect(typeof CoursesService.paginateByUserId).toBe('function');

        expect(CoursesService).toHaveProperty('update');
        expect(typeof CoursesService.update).toBe('function');
    });
});