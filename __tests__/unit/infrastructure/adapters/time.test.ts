import { Time } from '@infrasturcture/adapters';

describe('Test in Time adapter', () => {
    it('should have respective methods', () => {
        expect(Time).toHaveProperty('locale');
        expect(typeof Time.locale).toBe('object');

        expect(Time.locale).toHaveProperty('es');
        expect(typeof Time.locale.es).toBe('object');

        expect(Time).toHaveProperty('plugins');
        expect(typeof Time.plugins).toBe('object');

        expect(Time.plugins).toHaveProperty('weekday');
        expect(typeof Time.plugins.weekday).toBe('function');

        expect(Time).toHaveProperty('extend');
        expect(typeof Time.extend).toBe('function');

        expect(Time).toHaveProperty('format');
        expect(typeof Time.format).toBe('function');

        expect(Time).toHaveProperty('getArrayValuesOfWeek');
        expect(typeof Time.getArrayValuesOfWeek).toBe('function');

        expect(Time).toHaveProperty('getDiffBetweenDatesInHours');
        expect(typeof Time.getDiffBetweenDatesInHours).toBe('function');

        expect(Time).toHaveProperty('getDiffBetweenDatesInMinutes');
        expect(typeof Time.getDiffBetweenDatesInMinutes).toBe('function');

        expect(Time).toHaveProperty('getFirstDateOfMonth');
        expect(typeof Time.getFirstDateOfMonth).toBe('function');

        expect(Time).toHaveProperty('getFirstDayOfCurrentWeek');
        expect(typeof Time.getFirstDayOfCurrentWeek).toBe('function');

        expect(Time).toHaveProperty('getLastDateOfMonth');
        expect(typeof Time.getLastDateOfMonth).toBe('function');

        expect(Time).toHaveProperty('getLastDayOfCurrentWeek');
        expect(typeof Time.getLastDayOfCurrentWeek).toBe('function');

        expect(Time).toHaveProperty('getMonthName');
        expect(typeof Time.getMonthName).toBe('function');

        expect(Time).toHaveProperty('getMonthOfDate');
        expect(typeof Time.getMonthOfDate).toBe('function');

        expect(Time).toHaveProperty('getRestMins');
        expect(typeof Time.getRestMins).toBe('function');

        expect(Time).toHaveProperty('getYearOfDate');
        expect(typeof Time.getYearOfDate).toBe('function');

        expect(Time).toHaveProperty('isBefore');
        expect(typeof Time.isBefore).toBe('function');

        expect(Time).toHaveProperty('setHoursMinutesAndSecondsToDate');
        expect(typeof Time.setHoursMinutesAndSecondsToDate).toBe('function');

        expect(Time).toHaveProperty('setLocale');
        expect(typeof Time.setLocale).toBe('function');

        expect(Time).toHaveProperty('setSecondsToDate');
        expect(typeof Time.setSecondsToDate).toBe('function');

        expect(Time).toHaveProperty('setMonthAndYearToDate');
        expect(typeof Time.setMonthAndYearToDate).toBe('function');

        expect(Time).toHaveProperty('sumHours');
        expect(typeof Time.sumHours).toBe('function');

        expect(Time).toHaveProperty('sumMins');
        expect(typeof Time.sumMins).toBe('function');

        expect(Time).toHaveProperty('sumNumbers');
        expect(typeof Time.sumNumbers).toBe('function');

        expect(Time).toHaveProperty('toDate');
        expect(typeof Time.toDate).toBe('function');

        expect(Time).toHaveProperty('toISOString');
        expect(typeof Time.toISOString).toBe('function');
    });

    it('should format date - format', () => {
        const currentDate = new Date();
        const formattedDate = Time.format(currentDate, 'YYYY-MM-DD');

        expect(formattedDate).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    });

    it('should faild format date because value is invalid - format', () => {
        const invalidDate = new Date('invalid');
        const formattedDate = Time.format(invalidDate, 'YYYY-MM-DD');

        expect(formattedDate).toBe('Invalid Date');
    });

    it('should get first day of current week - getFirstDayOfCurrentWeek', () => {
        const firstDayOfWeekTest = Time.getFirstDayOfCurrentWeek();

        const today = new Date();
        const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const firstDayOfWeekFormatted = Time.format(firstDayOfWeek, 'YYYY-MM-DD');

        expect(firstDayOfWeekTest).toBe(firstDayOfWeekFormatted);
    });

    it('should get last day of current week - getLastDayOfCurrentWeek', () => {
        const lastDayOfWeekTest = Time.getLastDayOfCurrentWeek();

        const today = new Date();
        const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const lastDayOfWeek = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + 6);
        const lastDayOfWeekFormatted = Time.format(lastDayOfWeek, 'YYYY-MM-DD');

        expect(lastDayOfWeekTest).toBe(lastDayOfWeekFormatted);
    });

    it('should get first date of current month - getFirstDateOfMonth', () => {
        const today = new Date();

        const firstDateOfMonthTest = Time.getFirstDateOfMonth(today, 'YYYY-MM-DD');
        const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDateOfMonthFormatted = Time.format(firstDateOfMonth, 'YYYY-MM-DD');

        expect(firstDateOfMonthTest).toBe(firstDateOfMonthFormatted);
    });

    it('should faild becuase value is invalid - getFirstDateOfMonth', () => {
        const invalidDate = new Date('invalid');
        const firstDateOfMonthTest = Time.getFirstDateOfMonth(invalidDate, 'YYYY-MM-DD');

        expect(firstDateOfMonthTest).toBe('Invalid Date');
    });

    it('should get last date of current month - getLastDateOfMonth', () => {
        const today = new Date();

        const lastDateOfMonthTest = Time.getLastDateOfMonth(today, 'YYYY-MM-DD');
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const lastDateOfMonthFormatted = Time.format(lastDayOfMonth, 'YYYY-MM-DD');

        expect(lastDateOfMonthTest).toBe(lastDateOfMonthFormatted);
    });

    it('should faild becuase value is invalid - getLastDateOfMonth', () => {
        const invalidDate = new Date('invalid');
        const lastDateOfMonthTest = Time.getLastDateOfMonth(invalidDate, 'YYYY-MM-DD');

        expect(lastDateOfMonthTest).toBe('Invalid Date');
    });

    it('should get rest minutes - getRestMins', () => {
        const dates = [
            { init: '2022-01-01T00:00:00', finish: '2022-01-01T00:00:00' },
            { init: '2022-01-01T01:00:00', finish: '2022-01-01T01:30:00' }
        ];

        const restMinsTest = Time.getRestMins(dates);
        expect(restMinsTest).toBe(30);
    });

    it('should faild becuase value is invalid - getRestMins', () => {
        const dates = [
            { init: '2022-01-01T00:00:00', finish: '2022-01-01T00:00:00' },
            { init: '2022-01-01T01:00:00', finish: 'invalid' }
        ];

        const restMinsTest = Time.getRestMins(dates);
        expect(restMinsTest).toBeNaN();
    });

    it('should get year of date - getYearOfDate', () => {
        const dateTest = Time.getYearOfDate('2022-01-01');
        expect(dateTest).toBe(2022);
    });

    it('should faild becuase value is invalid - getYearOfDate', () => {
        const dateTest = Time.getYearOfDate('invalid');
        expect(dateTest).toBeNaN();
    });

    it('should sum hours - sumHours', () => {
        const dates = [
            { init: '2022-01-01T00:00:00', finish: '2022-01-01T00:30:00' },
            { init: '2022-01-01T01:00:00', finish: '2022-01-01T01:30:00' }
        ];

        const sumHoursTest = Time.sumHours(dates);
        expect(sumHoursTest).toBe(1);
    });

    it('should faild becuase value is invalid - sumHours', () => {
        const dates = [
            { init: '2022-01-01T00:00:00', finish: '2022-01-01T00:30:00' },
            { init: '2022-01-01T01:00:00', finish: 'invalid' }
        ];

        const sumHoursTest = Time.sumHours(dates);
        expect(sumHoursTest).toBeNaN();
    });

    it('should sum minutes - sumMins', () => {
        const dates = [
            { init: '2022-12-10T00:00:00.000Z', finish: '2022-12-10T01:00:00.000Z' },
            { init: '2022-12-11T01:00:00.000Z', finish: '2022-12-11T04:30:00.000Z' }
        ];

        const sumMinsTest = Time.sumMins(dates);

        expect(sumMinsTest.hours).toBe(0);
        expect(sumMinsTest.restMins).toBe(30);
    });

    it('should faild becuase value is invalid - sumMins', () => {
        const dates = [
            { init: '2022-12-10T00:00:00.000Z', finish: '2022-12-10T01:00:00.000Z' },
            { init: '2022-12-11T01:00:00.000Z', finish: 'invalid' }
        ];

        const sumMinsTest = Time.sumMins(dates);

        expect(sumMinsTest.hours).toBeNaN();
        expect(sumMinsTest.restMins).toBeNaN();
    });

    it('should sum numbers - sumNumbers', () => {
        const numbers = [ 1, 2, 3, 4, 5, 6, 7 ];
        const sumNumbersTest = Time.sumNumbers(numbers);

        expect(sumNumbersTest).toBe(28);
    });
});