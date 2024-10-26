/* Services */
import { LessonsService } from '@domain/services';

describe('Test in LessonsService', () => {
    it('should have respective methods', () => {
        expect(LessonsService).toHaveProperty('create');
        expect(typeof LessonsService.create).toBe('function');

        expect(LessonsService).toHaveProperty('delete');
        expect(typeof LessonsService.delete).toBe('function');

        expect(LessonsService).toHaveProperty('deleteLessonsByCourseId');
        expect(typeof LessonsService.deleteLessonsByCourseId).toBe('function');

        expect(LessonsService).toHaveProperty('finishOrStart');
        expect(typeof LessonsService.finishOrStart).toBe('function');

        expect(LessonsService).toHaveProperty('getAllByCourseId');
        expect(typeof LessonsService.getAllByCourseId).toBe('function');

        expect(LessonsService).toHaveProperty('getLastLessonByCoursesId');
        expect(typeof LessonsService.getLastLessonByCoursesId).toBe('function');

        expect(LessonsService).toHaveProperty('update');
        expect(typeof LessonsService.update).toBe('function');
    });
});