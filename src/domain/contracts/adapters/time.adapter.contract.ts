import { Formats, LocaleValue } from '@infrastructure/interfaces';

export abstract class TimeAdapterContract {
    public abstract readonly formats: Formats;
    public abstract format(date: string | number | Date, format: string): string;
    public abstract getArrayValuesOfWeek<T extends { day: string }>(array: T[]): T[];
    public abstract getDiffBetweenDatesInHours(date1: string | number | Date, date2: string | number | Date): number;
    public abstract getDiffBetweenDatesInMinutes(date1: string | number | Date, date2: string | number | Date): number;
    public abstract getFirstDateOfMonth(date: string | number | Date, format: string): string;
    public abstract getLastDateOfMonth(date: string | number | Date, format: string): string;
    public abstract getLastDayOfCurrentWeek(): string;
    public abstract getMonthName(month: number): string;
    public abstract getMonthOfDate(date: string | number | Date): number;
    public abstract getRestMins(dates: { init: string, finish: string }[]): number;
    public abstract getYearOfDate(date: string | number | Date): number;
    public abstract isBefore(initHour: string | number | Date, finalHour: string | number | Date): boolean;
    public abstract setHoursMinutesAndSecondsToDate(date: string | number | Date, hours: number, minutes: number, seconds: number): string;
    public abstract setLocale(locale: LocaleValue): void;
    public abstract setMonthAndYearToDate(date: string | number | Date, month: number, year: number): string;
    public abstract setSecondsToDate(date: string | number | Date, seconds: number): string;
    public abstract sumHours(dates: { init: string, finish: string }[]): number;
    public abstract sumMins(dates: { init: string, finish: string }[]): { hours: number, restMins: number };
    public abstract sumNumbers(numbers: number[]): number;
    public abstract toDate(date: string | number): Date;
    public abstract toISOString(date: string | number | Date | null | undefined): string;
}