import { getRestMins, sumHours, sumMins, sumNumbers } from '../../src/utils';

describe('Test in calc utils', () => {
    it('should sumNumbers return the sum of the numbers in the array', () => {
        const numbers = [1, 2, 3, 4];
        const expectedSum = 10;
        const result = sumNumbers(numbers);

        expect(result).toBe(expectedSum);
    });

    it('should sumHours correctly sum hours', () => {
        const dates = [
            { init: '2022-01-01T10:00:00', finish: '2022-01-01T12:00:00' },
            { init: '2022-01-02T08:00:00', finish: '2022-01-02T09:00:00' },
        ];

        expect(sumHours(dates)).toBe(3);
    });

    it('should getRestMins correctly return the rest minutes', () => {
        const dates = [
            { init: '2022-01-01T10:00:00', finish: '2022-01-01T12:00:00' },
            { init: '2022-01-02T08:00:00', finish: '2022-01-02T09:30:00' },
        ];

        expect(getRestMins(dates)).toBe(30);
    });

    it('should sumMins correctly sum minutes', () => {
        const dates = [
            { init: '2022-01-01T10:00:00', finish: '2022-01-01T12:00:00' },
            { init: '2022-01-02T08:00:00', finish: '2022-01-02T09:30:00' },
        ];

        expect(sumMins(dates)).toEqual({ hours: 0, restMins: 30 });
    });
});