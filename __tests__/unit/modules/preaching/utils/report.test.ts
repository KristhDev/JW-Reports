import { report } from '@preaching';

describe('Test in report util', () => {
    it('should have respective methods', () => {
        expect(report).toEqual({
            getHoursDoneByWeek: expect.any(Function),
            getHoursRequirementByWeek: expect.any(Function),
            getRemainingHoursOfWeeklyRequirement: expect.any(Function),
            getReamainingOfHoursRequirement: expect.any(Function),
        });
    });
})