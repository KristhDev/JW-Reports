/* Services */
import { PreachingReportService } from '@domain/services';

describe('Test in PreachingReportService', () => {
    it('should to have respective methods', () => {
        expect(PreachingReportService).toHaveProperty('generatePrechingReportString');
        expect(typeof PreachingReportService.generatePrechingReportString).toBe('function');

        expect(PreachingReportService).toHaveProperty('generatePreachingReportForExport');
        expect(typeof PreachingReportService.generatePreachingReportForExport).toBe('function');

        expect(PreachingReportService).toHaveProperty('getHoursDoneByWeek');
        expect(typeof PreachingReportService.getHoursDoneByWeek).toBe('function');

        expect(PreachingReportService).toHaveProperty('getHoursRequirementByWeek');
        expect(typeof PreachingReportService.getHoursRequirementByWeek).toBe('function');

        expect(PreachingReportService).toHaveProperty('getRemainingHoursOfWeeklyRequirement');
        expect(typeof PreachingReportService.getRemainingHoursOfWeeklyRequirement).toBe('function');

        expect(PreachingReportService).toHaveProperty('getReamainingOfHoursRequirement');
        expect(typeof PreachingReportService.getReamainingOfHoursRequirement).toBe('function');

        expect(PreachingReportService).toHaveProperty('groupByMonthAndYear');
        expect(typeof PreachingReportService.groupByMonthAndYear).toBe('function');
    });
});