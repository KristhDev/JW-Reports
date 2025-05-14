import dayjs from 'dayjs';
import localeEn from 'dayjs/locale/en';
import localeEs from 'dayjs/locale/es';

import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { TimeAdapterContract } from '@domain/contracts/adapters';

import { Formats, LocaleValue } from '@infrastructure/interfaces';

export class TimeAdapter implements TimeAdapterContract {
    public readonly formats: Formats = {
        DATE_ONLY: 'YYYY-MM-DD',
        DAY: 'DD',
        HOURS_MINUTES: 'HH:mm',
        HOURS: 'HH',
        LOCALE_LONG_DATE: 'LL',
        LOCALE_SHORT_DATE: 'L',
        MINUTES: 'mm',
        MONTH_AND_YEAR: 'MMMM YYYY',
        MONTH_NAME: 'MMMM',
        SQL_DATETIME: 'YYYY-MM-DD HH:mm:ss.SSSSSS'
    }

    constructor() {
        dayjs.extend(localizedFormat);
        dayjs.extend(weekday);
    }

    /**
     * Returns a string representation of the given date, formatted according to the specified format.
     *
     * @param {string | number | Date} date - The date to be formatted.
     * @param {string} format - The format to be used.
     * @returns {string} The formatted date string.
     */
    public format(date: string | number | Date, format: string): string {
        return dayjs(date).format(format);
    }

    /**
     * Filters an array of objects to include only those with a 'day' property that falls within the current week.
     *
     * @template T - The type of objects in the input array, extending an object with a 'day' string property.
     * @param {Array<T>} array - An array of objects to be filtered.
     * @returns {Array<T>} An array of objects where the 'day' property is within the current week.
     */
    public getArrayValuesOfWeek<T extends { day: string }>(array: T[]): T[] {
        const firstDayOfWeek = this.getFirstDayOfCurrentWeek();
        const lastDayOfWeek = this.getLastDayOfCurrentWeek();

        return array.filter(
            el => dayjs(el.day).isSame(firstDayOfWeek)
                || dayjs(el.day).isAfter(firstDayOfWeek)
                && dayjs(el.day).isBefore(lastDayOfWeek)
                || dayjs(el.day).isSame(lastDayOfWeek)
        );
    }

    /**
     * Returns the difference in hours between the two given dates.
     *
     * @param {string|number|Date} date1
     * @param {string|number|Date} date2
     * @returns {number} The difference in hours.
     */
    public getDiffBetweenDatesInHours(date1: string | number | Date, date2: string | number | Date): number {
        return dayjs(date1).diff(dayjs(date2), 'hours');
    }

    /**
     * Returns the difference in minutes between the two given dates.
     *
     * @param {string|number|Date} date1 - The first date.
     * @param {string|number|Date} date2 - The second date.
     * @returns {number} The difference in minutes.
     */
    public getDiffBetweenDatesInMinutes(date1: string | number | Date, date2: string | number | Date): number {
        return dayjs(date1).diff(dayjs(date2), 'minutes');
    }

    /**
     * Returns the first date of the month for a given date in the specified format.
     *
     * @param {string|number|Date} date - The date for which the first date of the month is to be obtained.
     * @param {string} format - The desired format of the output date.
     * @returns {string} The first date of the month in the specified format.
     */
    public getFirstDateOfMonth(date: string | number | Date, format: string): string {
        return dayjs(date).startOf('month').format(format);
    }

    /**
     * Returns the first day of the current week in the format 'YYYY-MM-DD'.
     *
     * @returns {string} The first day of the current week in the format 'YYYY-MM-DD'.
     */
    public getFirstDayOfCurrentWeek(): string {
        return dayjs().startOf('week').format('YYYY-MM-DD');
    }

    /**
     * Returns the last date of the month for a given date in the specified format.
     *
     * @param {string|number|Date} date - The date for which the last date of the month is to be obtained.
     * @param {string} format - The desired format of the output date.
     * @returns {string} The last date of the month in the specified format.
     */
    public getLastDateOfMonth(date: string | number | Date, format: string): string {
        return dayjs(date).endOf('month').format(format);
    }

    /**
     * Returns the last day of the current week in the format 'YYYY-MM-DD'.
     *
     * @returns {string} The last day of the current week in the format 'YYYY-MM-DD'.
     */
    public getLastDayOfCurrentWeek(): string {
        return dayjs().endOf('week').format('YYYY-MM-DD');
    }

    /**
     * Returns the name of the month corresponding to the given month number.
     *
     * @param {number} month - The month number (0-11).
     * @returns {string} The name of the month.
     */
    public getMonthName(month: number): string {
        return dayjs().month(month).format('MMMM');
    }

    /**
     * Returns the month number (0-11) of the given date.
     *
     * @param {string|number|Date} date - The date for which the month is to be obtained.
     * @returns {number} The month number (0-11).
     */
    public getMonthOfDate(date: string | number | Date): number {
        return dayjs(date).get('month');
    }

    /**
     * Calculates the total remaining minutes from an array of date ranges.
     *
     * @param {Array<{init: string, finish: string}>} dates - An array of objects containing the start and end times.
     * @return {number} The total remaining minutes after calculating the difference for each date range.
     */
    public getRestMins(dates: { init: string, finish: string }[]): number {
        const { restMins } = this.sumMins(dates);
        return restMins;
    }

    /**
     * Returns the year of the given date.
     *
     * @param {string|number|Date} date - The date for which the year is to be obtained.
     * @returns {number} The year of the given date.
     */
    public getYearOfDate(date: string | number | Date): number {
        return dayjs(date).get('year');
    }

    /**
     * Checks if the given initHour is before the given finalHour.
     *
     * @param {string|number|Date} initHour - The initial hour to compare.
     * @param {string|number|Date} finalHour - The final hour to compare.
     * @returns {boolean} true if the initHour is before the finalHour, false otherwise.
     */
    public isBefore(initHour: string | number | Date, finalHour: string | number | Date): boolean {
        return dayjs(initHour).isBefore(dayjs(finalHour));
    }

    /**
     * Sets the hours, minutes, and seconds of a given date to the specified values, and returns the resulting date in ISO format.
     *
     * @param {string|number|Date} date - The date for which the hours, minutes, and seconds are to be set.
     * @param {number} hours - The number of hours to set.
     * @param {number} minutes - The number of minutes to set.
     * @param {number} seconds - The number of seconds to set.
     * @returns {string} The date with the hours, minutes, and seconds set in the ISO format.
     */
    public setHoursMinutesAndSecondsToDate(date: string | number | Date, hours: number, minutes: number, seconds: number): string {
        return dayjs(date).set('hours', hours).set('minutes', minutes).set('seconds', seconds).toISOString();
    }

    /**
     * Sets the locale of the dayjs library. The locale can be a string containing the locale code, or an ILocale object.
     *
     * @param {LocaleValue} locale - The locale to set.
     */
    public setLocale(locale: LocaleValue): void {
        const locales = {
            en: localeEn,
            es: localeEs
        }

        const localeSelected = locales[locale];
        dayjs.locale(localeSelected);
    }

    /**
     * Sets the month and year of a given date to the specified values.
     *
     * @param {string|number|Date} date - The date for which the month and year are to be set.
     * @param {number} month - The month number to set (0-11).
     * @param {number} year - The year number to set.
     * @returns {string} The date with the month and year set in the ISO format.
     */
    public setMonthAndYearToDate(date: string | number | Date, month: number, year: number): string {
        return dayjs(date).set('month', month).set('year', year).toISOString();
    }

    /**
     * Sets the seconds of a given date to the specified number of seconds.
     *
     * @param {string|number|Date} date - The date for which the seconds are to be set.
     * @param {number} seconds - The number of seconds to set.
     * @returns {string} The date with the seconds set in the ISO format.
     */
    public setSecondsToDate(date: string | number | Date, seconds: number): string {
        return dayjs(date).set('seconds', seconds).toISOString();
    }

    /**
     * Calculates the total hours from an array of date ranges.
     *
     * @param {Array<{init: string, finish: string}>} dates - An array of objects containing the start and end times.
     * @returns {number} The total hours after calculating the difference for each date range.
     */
    public sumHours(dates: { init: string, finish: string }[]): number {
        const hours = dates.map(date => {
            const start = dayjs(date.init);
            const end = dayjs(date.finish);

            return end.diff(start, 'hours');
        });

        const { hours: minHours } = this.sumMins(dates);

        return (minHours >= 1)
            ? minHours + this.sumNumbers(hours)
            : this.sumNumbers(hours);
    }

    /**
     * Calculates the total minutes from an array of date ranges.
     *
     * @param {Array<{init: string, finish: string}>} dates - An array of objects containing the start and end times.
     * @returns {{hours: number, restMins: number}} An object with the total hours and the remaining minutes.
     */
    public sumMins(dates: { init: string, finish: string }[]): { hours: number, restMins: number } {
        const mins = dates.map(date => {
            const start = dayjs(date.init, 'HH:mm');
            const end = dayjs(date.finish, 'HH:mm');

            const diff = end.diff(start, 'minute');

            const hours = Math.floor(diff / 60);
            const restMins = diff - (hours * 60);

            return restMins;
        });

        const totalMins = this.sumNumbers(mins);
        const restMins = totalMins % 60;

        return {
            hours: Math.floor(totalMins / 60),
            restMins
        };
    }

    /**
     * Returns the sum of all the numbers in the given array.
     *
     * @param {Array<number>} numbers - An array of numbers to be summed.
     * @returns {number} The sum of all the numbers in the array.
     */
    public sumNumbers(numbers: number[]): number {
        return numbers.reduce((total, number) => total + number, 0);
    }

    /**
     * Converts a given date to a Date object.
     *
     * @param {string | number} date - The date to be converted.
     * @returns {Date} The converted Date object.
     */
    public toDate(date: string | number): Date {
        return dayjs(date).toDate();
    }

    /**
     * Converts a given date to its ISO string representation.
     *
     * @param {string|number|Date|null|undefined} date - The date to be converted.
     * @returns {string} The ISO string representation of the date.
     */
    public toISOString(date: string | number | Date | null | undefined): string {
        return dayjs(date).toISOString();
    }
}
