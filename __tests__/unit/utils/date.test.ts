import { date } from '../../../src/utils';

describe('Test date util', () => {
    it('should have respective methods', () => {
        expect(date).toEqual({
            locale: {
                es: expect.any(Object),
            },
            plugins: {
                weekday: expect.any(Function),
            },

            extend: expect.any(Function),
            format: expect.any(Function),
            getArrayValuesOfWeek: expect.any(Function),
            getFirstDateOfMonth: expect.any(Function),
            getFirstDayOfCurrentWeek: expect.any(Function),
            getLastDateOfMonth: expect.any(Function),
            getLastDayOfCurrentWeek: expect.any(Function),
            getMonthName: expect.any(Function),
            getMonthOfDate: expect.any(Function),
            getRestMins: expect.any(Function),
            getYearOfDate: expect.any(Function),
            isBefore: expect.any(Function),
            setHoursToDate: expect.any(Function),
            setLocale: expect.any(Function),
            setMinutesToDate: expect.any(Function),
            setMonthToDate: expect.any(Function),
            setSecondsToDate: expect.any(Function),
            setYearToDate: expect.any(Function),
            sumHours: expect.any(Function),
            sumMins: expect.any(Function),
            sumNumbers: expect.any(Function),
            toDate: expect.any(Function),
            toISOString: expect.any(Function),
        });
    });

    it('should format date - format', () => {
        const currentDate = new Date();
        const formattedDate = date.format(currentDate, 'YYYY-MM-DD');

        expect(formattedDate).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    });

    it('should faild format date because value is invalid - format', () => {
        const invalidDate = new Date('invalid');
        const formattedDate = date.format(invalidDate, 'YYYY-MM-DD');

        expect(formattedDate).toBe('Invalid Date');
    });

    it('should get first day of current week - getFirstDayOfCurrentWeek', () => {
        const firstDayOfWeekTest = date.getFirstDayOfCurrentWeek();

        const today = new Date();
        const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const firstDayOfWeekFormatted = date.format(firstDayOfWeek, 'YYYY-MM-DD');

        expect(firstDayOfWeekTest).toBe(firstDayOfWeekFormatted);
    });

    it('should get last day of current week - getLastDayOfCurrentWeek', () => {
        const lastDayOfWeekTest = date.getLastDayOfCurrentWeek();

        const today = new Date();
        const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const lastDayOfWeek = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + 6);
        const lastDayOfWeekFormatted = date.format(lastDayOfWeek, 'YYYY-MM-DD');

        expect(lastDayOfWeekTest).toBe(lastDayOfWeekFormatted);
    });

    it('should get first date of current month - getFirstDateOfMonth', () => {
        const today = new Date();

        const firstDateOfMonthTest = date.getFirstDateOfMonth(today, 'YYYY-MM-DD');
        const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDateOfMonthFormatted = date.format(firstDateOfMonth, 'YYYY-MM-DD');

        expect(firstDateOfMonthTest).toBe(firstDateOfMonthFormatted);
    });

    it('should faild becuase value is invalid - getFirstDateOfMonth', () => {
        const invalidDate = new Date('invalid');
        const firstDateOfMonthTest = date.getFirstDateOfMonth(invalidDate, 'YYYY-MM-DD');

        expect(firstDateOfMonthTest).toBe('Invalid Date');
    });

    it('should get last date of current month - getLastDateOfMonth', () => {
        const today = new Date();

        const lastDateOfMonthTest = date.getLastDateOfMonth(today, 'YYYY-MM-DD');
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const lastDateOfMonthFormatted = date.format(lastDayOfMonth, 'YYYY-MM-DD');

        expect(lastDateOfMonthTest).toBe(lastDateOfMonthFormatted);
    });

    it('should faild becuase value is invalid - getLastDateOfMonth', () => {
        const invalidDate = new Date('invalid');
        const lastDateOfMonthTest = date.getLastDateOfMonth(invalidDate, 'YYYY-MM-DD');

        expect(lastDateOfMonthTest).toBe('Invalid Date');
    });

    it('should get rest minutes - getRestMins', () => {
        const dates = [
            { init: '2022-01-01T00:00:00', finish: '2022-01-01T00:00:00' },
            { init: '2022-01-01T01:00:00', finish: '2022-01-01T01:30:00' }
        ];

        const restMinsTest = date.getRestMins(dates);
        expect(restMinsTest).toBe(30);
    });

    it('should faild becuase value is invalid - getRestMins', () => {
        const dates = [
            { init: '2022-01-01T00:00:00', finish: '2022-01-01T00:00:00' },
            { init: '2022-01-01T01:00:00', finish: 'invalid' }
        ];

        const restMinsTest = date.getRestMins(dates);
        expect(restMinsTest).toBeNaN();
    });

    it('should get year of date - getYearOfDate', () => {
        const dateTest = date.getYearOfDate('2022-01-01');
        expect(dateTest).toBe(2022);
    });

    it('should faild becuase value is invalid - getYearOfDate', () => {
        const dateTest = date.getYearOfDate('invalid');
        expect(dateTest).toBeNaN();
    });

    it('should sum hours - sumHours', () => {
        const dates = [
            { init: '2022-01-01T00:00:00', finish: '2022-01-01T00:30:00' },
            { init: '2022-01-01T01:00:00', finish: '2022-01-01T01:30:00' }
        ];

        const sumHoursTest = date.sumHours(dates);
        expect(sumHoursTest).toBe(1);
    });

    it('should faild becuase value is invalid - sumHours', () => {
        const dates = [
            { init: '2022-01-01T00:00:00', finish: '2022-01-01T00:30:00' },
            { init: '2022-01-01T01:00:00', finish: 'invalid' }
        ];

        const sumHoursTest = date.sumHours(dates);
        expect(sumHoursTest).toBeNaN();
    });

    it('should sum minutes - sumMins', () => {
        const dates = [
            { init: '2022-12-10T00:00:00.000Z', finish: '2022-12-10T01:00:00.000Z' },
            { init: '2022-12-11T01:00:00.000Z', finish: '2022-12-11T04:30:00.000Z' }
        ];

        const sumMinsTest = date.sumMins(dates);

        expect(sumMinsTest.hours).toBe(0);
        expect(sumMinsTest.restMins).toBe(30);
    });

    it('should faild becuase value is invalid - sumMins', () => {
        const dates = [
            { init: '2022-12-10T00:00:00.000Z', finish: '2022-12-10T01:00:00.000Z' },
            { init: '2022-12-11T01:00:00.000Z', finish: 'invalid' }
        ];

        const sumMinsTest = date.sumMins(dates);

        expect(sumMinsTest.hours).toBeNaN();
        expect(sumMinsTest.restMins).toBeNaN();
    });

    it('should sum numbers - sumNumbers', () => {
        const numbers = [ 1, 2, 3, 4, 5, 6, 7 ];
        const sumNumbersTest = date.sumNumbers(numbers);

        expect(sumNumbersTest).toBe(28);
    });
});