import dayjs, { Dayjs } from 'dayjs';
import localeEs from 'dayjs/locale/es';
import weekday from 'dayjs/plugin/weekday';

export const date = {
    locale: {
        es: localeEs
    },

    plugins: {
        weekday
    },

    /**
     * Formats the given data using the specified format.
     *
     * @param {string | number | Date} date - The data to be formatted. It can be a string, number, or Date object.
     * @param {string} format - The format string specifying the desired output format.
     * @return {string} The formatted data as a string.
     */
    format: (date: string | number | Date, format: string): string => {
        return dayjs(date).format(format);
    },

    /**
     * Extends the functionality of the dayjs library with the specified plugin.
     *
     * @param {any} plugin - The plugin to be extended.
     * @return {void} This function does not return anything.
     */
    extend: (plugin: any): void => {
        dayjs.extend(plugin);
    },

    /**
     * Filters an array of objects based on the day property to get values within the current week.
     *
     * @param {T[]} array - The array of objects with a 'day' property.
     * @return {T[]} The filtered array containing objects within the current week.
     */
    getArrayValuesOfWeek: <T extends { day: string }>(array: T[]): Array<T> => {
        const firstDayOfWeek = date.getFirstDayOfCurrentWeek();
        const lastDayOfWeek = date.getLastDayOfCurrentWeek();

        return array.filter(
            el => dayjs(el.day).isSame(firstDayOfWeek)
            || dayjs(el.day).isAfter(firstDayOfWeek)
            && dayjs(el.day).isBefore(lastDayOfWeek)
            || dayjs(el.day).isSame(lastDayOfWeek)
        );
    },

    /**
     * Returns the first day of the current week in the format 'YYYY-MM-DD'.
     *
     * @return {string} The first day of the current week in the format 'YYYY-MM-DD'.
     */
    getFirstDayOfCurrentWeek: (): string => {
        return dayjs().startOf('week').format('YYYY-MM-DD');
    },

    /**
     * Returns the last day of the current week in the format 'YYYY-MM-DD'.
     *
     * @return {string} The last day of the current week.
     */
    getLastDayOfCurrentWeek: (): string => {
        return dayjs().endOf('week').format('YYYY-MM-DD');
    },

    /**
     * Returns the first date of the month for the given date in the specified format.
     *
     * @param {string | number | Date} date - The date to get the first date of the month for.
     * @param {string} format - The format string specifying the desired output format.
     * @return {string} The formatted first date of the month.
     */
    getFirstDateOfMonth: (date: string | number | Date, format: string): string => {
        return dayjs(date).startOf('month').format(format);
    },

    /**
     * Returns the last date of the month for a given date in the specified format.
     *
     * @param {string | number | Date} date - The input date.
     * @param {string} format - The desired format for the output date.
     * @return {string} The last date of the month in the specified format.
     */
    getLastDateOfMonth: (date: string | number | Date, format: string): string => {
        return dayjs(date).endOf('month').format(format);
    },

    /**
     * Calculates and returns the remaining minutes from the sum of minutes in a given array of date ranges.
     *
     * @param {{ init: string, finish: string }[]} dates - Array of date ranges with start and end times.
     * @return {number} The remaining minutes after summing up the minutes from the date ranges.
     */
    getRestMins: (dates: { init: string, finish: string }[]): number => {
        const { restMins } = date.sumMins(dates);
        return restMins;
    },

    /**
     * Returns the year of the given date.
     *
     * @param {string | number | Date} date - The date to extract the year from.
     * @return {number} The year of the given date.
     */
    getYearOfDate: (date: string | number | Date): number => {
        return dayjs(date).get('year');
    },

    /**
     * Checks if the initial hour is before the final hour.
     *
     * @param {string | number | Date} initHour - The initial hour to compare.
     * @param {string | number | Date} finalHour - The final hour to compare.
     * @return {boolean} Returns true if the initial hour is before the final hour, otherwise returns false.
     */
    isBefore: (initHour: string | number | Date, finalHour: string | number | Date): boolean => {
        return dayjs(initHour).isBefore(dayjs(finalHour));
    },

    /**
     * Sets the hour of a given date to the specified number of hours.
     *
     * @param {string | number | Date} date - The date to modify. Can be a string in ISO 8601 format, a number representing milliseconds since the Unix Epoch, or a Date object.
     * @param {number} hours - The number of hours to set the date to.
     * @return {string} The modified date in ISO 8601 format.
     */
    setHoursToDate: (date: string | number | Date, hours: number): string => {
        return dayjs(date).set('hour', hours).toISOString();
    },

    /**
     * Sets the locale for dayjs library.
     *
     * @param {string} locale - The locale to set for dayjs.
     * @return {void} This function does not return anything.
     */
    setLocale: (locale: string | ILocale): void => {
        dayjs.locale(locale);
    },

    /**
     * Sets the minutes of a given date to the specified number of minutes.
     *
     * @param {string | number | Date} date - The date to modify. Can be a string in ISO 8601 format, a number representing milliseconds since the Unix Epoch, or a Date object.
     * @param {number} minutes - The number of minutes to set the date to.
     * @return {string} The modified date in ISO 8601 format.
     */
    setMinutesToDate: (date: string | number | Date, minutes: number): string => {
        return dayjs(date).set('minute', minutes).toISOString();
    },

    /**
     * Calculates the total hours from an array of date ranges and adjusts it based on the sum of minutes.
     *
     * @param {{ init: string, finish: string }[]} dates - Array of date ranges with start and end times.
     * @return {number} The total hours calculated from the date ranges after adjusting with the sum of minutes.
     */
    sumHours: (dates: { init: string, finish: string }[]): number => {
        const hours = dates.map(date => {
            const start = dayjs(date.init);
            const end = dayjs(date.finish);

            return end.diff(start, 'hours');
        });

        const { hours: minHours } = date.sumMins(dates);

        return (minHours >= 1)
            ? minHours + date.sumNumbers(hours)
            : date.sumNumbers(hours);
    },

    /**
     * Calculates the total hours and remaining minutes from an array of date ranges.
     *
     * @param {Array<{ init: string, finish: string }>} dates - Array of date ranges with start and end times.
     * @return {Object} An object containing the total hours and remaining minutes.
     * - hours: The total number of hours calculated from the date ranges.
     * - restMins: The remaining number of minutes after calculating the total hours.
     */
    sumMins: (dates: { init: string, finish: string }[]): { hours: number, restMins: number } => {
        const mins = dates.map(date => {
            const start = dayjs(date.init, 'HH:mm');
            const end = dayjs(date.finish, 'HH:mm');

            const diff = end.diff(start, 'minute');

            const hours = Math.floor(diff / 60);
            const restMins = diff - (hours * 60);

            return restMins;
        });

        const totalMins = date.sumNumbers(mins);
        const restMins = totalMins % 60;

        return {
            hours: Math.floor(totalMins / 60),
            restMins
        }
    },

    /**
     * Calculates the sum of all numbers in the given array.
     *
     * @param {number[]} numbers - The array of numbers to be summed.
     * @return {number} The sum of all numbers in the array.
     */
    sumNumbers: (numbers: number[]): number => {
        return numbers.reduce((total, number) => total + number, 0);
    },

    toISOString: (date: string | number | Date | Dayjs | null | undefined): string => {
        return dayjs(date).toISOString();
    }
}