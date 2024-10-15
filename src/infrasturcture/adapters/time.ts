import dayjs, { Dayjs } from 'dayjs';
import localeEs from 'dayjs/locale/es';
import weekday from 'dayjs/plugin/weekday';

export class Time {
    public static locale = {
        es: localeEs
    };

    public static plugins = {
        weekday
    };

    /**
     * Formats the given data using the specified format.
     */
    public static format(date: string | number | Date, format: string): string {
        return dayjs(date).format(format);
    }

    /**
     * Extends the functionality of the dayjs library with the specified plugin.
     */
    public static extend(plugin: any): void {
        dayjs.extend(plugin);
    }

    /**
     * Filters an array of objects based on the day property to get values within the current week.
     */
    public static getArrayValuesOfWeek<T extends { day: string }>(array: T[]): Array<T> {
        const firstDayOfWeek = Time.getFirstDayOfCurrentWeek();
        const lastDayOfWeek = Time.getLastDayOfCurrentWeek();

        return array.filter(
            el => dayjs(el.day).isSame(firstDayOfWeek)
                || dayjs(el.day).isAfter(firstDayOfWeek)
                && dayjs(el.day).isBefore(lastDayOfWeek)
                || dayjs(el.day).isSame(lastDayOfWeek)
        );
    }

    /**
     * Returns the first date of the month for the given date in the specified format.
     */
    public static getFirstDateOfMonth(date: string | number | Date, format: string): string {
        return dayjs(date).startOf('month').format(format);
    }

    /**
     * Returns the first day of the current week in the format 'YYYY-MM-DD'.
     */
    public static getFirstDayOfCurrentWeek(): string {
        return dayjs().startOf('week').format('YYYY-MM-DD');
    }

    /**
     * Returns the last date of the month for a given date in the specified format.
     */
    public static getLastDateOfMonth(date: string | number | Date, format: string): string {
        return dayjs(date).endOf('month').format(format);
    }

    /**
     * Returns the last day of the current week in the format 'YYYY-MM-DD'.
     */
    public static getLastDayOfCurrentWeek(): string {
        return dayjs().endOf('week').format('YYYY-MM-DD');
    }

    /**
     * Returns the name of the month corresponding to the given month number.
     */
    public static getMonthName(month: number): string {
        return dayjs().month(month).format('MMMM');
    }

    /**
     * Returns the month of a given date.
     */
    public static getMonthOfDate(date: string | number | Date): number {
        return dayjs(date).get('month');
    }

    /**
     * Calculates and returns the remaining minutes from the sum of minutes in a given array of date ranges.
     */
    public static getRestMins(dates: { init: string, finish: string }[]): number {
        const { restMins } = Time.sumMins(dates);
        return restMins;
    }

    /**
     * Returns the year of the given date.
     */
    public static getYearOfDate(date: string | number | Date): number {
        return dayjs(date).get('year');
    }

    /**
     * Checks if the initial hour is before the final hour.
     */
    public static isBefore(initHour: string | number | Date, finalHour: string | number | Date): boolean {
        return dayjs(initHour).isBefore(dayjs(finalHour));
    }

    /**
     * Sets the hour of a given date to the specified number of hours.
     */
    public static setHoursToDate(date: string | number | Date, hours: number): string {
        return dayjs(date).set('hour', hours).toISOString();
    }

    /**
     * Sets the locale for dayjs library.
     */
    public static setLocale(locale: string | ILocale): void {
        dayjs.locale(locale);
    }

    /**
     * Sets the minutes of a given date to the specified number of minutes.
     */
    public static setMinutesToDate(date: string | number | Date, minutes: number): string {
        return dayjs(date).set('minute', minutes).toISOString();
    }

    /**
     * Sets the month of a given date to the specified number of months.
     */
    public static setMonthToDate(date: string | number | Date, month: number): string {
        return dayjs(date).set('month', month).toISOString();
    }

    /**
     * Sets the seconds of a given date to the specified number of seconds.
     */
    public static setSecondsToDate(date: string | number | Date, seconds: number): string {
        return dayjs(date).set('second', seconds).toISOString();
    }

    /**
     * Sets the year of a given date to the specified number of years.
     */
    public static setYearToDate(date: string | number | Date, year: number): string {
        return dayjs(date).set('year', year).toISOString();
    }

    /**
     * Calculates the total hours from an array of date ranges and adjusts it based on the sum of minutes.
     */
    public static sumHours(dates: { init: string, finish: string }[]): number {
        const hours = dates.map(date => {
            const start = dayjs(date.init);
            const end = dayjs(date.finish);

            return end.diff(start, 'hours');
        });

        const { hours: minHours } = Time.sumMins(dates);

        return (minHours >= 1)
            ? minHours + Time.sumNumbers(hours)
            : Time.sumNumbers(hours);
    }

    /**
     * Calculates the total hours and remaining minutes from an array of date ranges.
     */
    public static sumMins(dates: { init: string, finish: string }[]): { hours: number, restMins: number } {
        const mins = dates.map(date => {
            const start = dayjs(date.init, 'HH:mm');
            const end = dayjs(date.finish, 'HH:mm');

            const diff = end.diff(start, 'minute');

            const hours = Math.floor(diff / 60);
            const restMins = diff - (hours * 60);

            return restMins;
        });

        const totalMins = Time.sumNumbers(mins);
        const restMins = totalMins % 60;

        return {
            hours: Math.floor(totalMins / 60),
            restMins
        };
    }

    /**
     * Calculates the sum of all numbers in the given array.
     */
    public static sumNumbers(numbers: number[]): number {
        return numbers.reduce((total, number) => total + number, 0);
    }

    /**
     * Converts a given date to a Date object.
     */
    public static toDate(date: string | number): Date {
        return dayjs(date).toDate();
    }

    /**
     * Converts a given date to an ISO string.
     */
    public static toISOString(date: string | number | Date | Dayjs | null | undefined): string {
        return dayjs(date).toISOString();
    }
}
