/* Constants */
import { precursors } from '@application/constants';

/* Entities */
import { PreachingEntity } from '@domain/entities';
import { GroupedPreachingsModel, PreachingReportModel } from '@domain/models';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Interfaces */
import { RemainingHoursOfWeeklyRequirement, ReamainingOfHoursRequirement, PreachingReportOptions } from '@infrasturcture/interfaces';

/* Utils */
import { Characters } from '@utils';

export class PreachingReportService {
    /**
     * Generates a preaching report string given the required options.
     *
     * @param {PreachingReportOptions} options - An object with the required properties to generate the report.
     * @return {string} The preaching report string.
     */
    public static generatePrechingReportString({ comment, courses, hours, hoursLDC, month, participated, precursor, username }: PreachingReportOptions): string {
        let report = '*Informe De Predicación* \n \n';
        report += `Nombre: ${ username }\n`;
        report += `Mes: ${ Characters.capitalize(month) }\n`;

        if (precursor !== precursors.NINGUNO) report += `Horas: ${ hours }\n`;
        else report += `Participo en el ministerio: ${ participated }`;

        if (precursor !== precursors.NINGUNO && hoursLDC > 0) report += `Horas LDC: ${ hoursLDC }\n`;

        report += `Cursos: ${ courses } \n`;
        report += 'Comentarios: \n';
        report += `${ (comment.trim().length > 0) ? comment : 'Ninguno' }`;

        return report;
    }

    /**
     * Generates a preaching report for export given the preachings grouped by month and year.
     *
     * @param {GroupedPreachingsModel} options - An object with the required properties to generate the report.
     * @return {PreachingReportModel} The preaching report.
     */
    public static generatePreachingReportForExport({ month, year, preachings }: GroupedPreachingsModel): PreachingReportModel {
        const hours = Time.sumHours(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));
        const restMins = Time.getRestMins(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));

        return {
            hours,
            restMins,
            month,
            year
        }
    }

    /**
     * Calculates the total hours and minutes done in a week from an array of preaching entries.
     *
     * @param {PreachingEntity[]} preachingsOfWeek - An array of preaching entities for the week.
     * @return {string} The total hours and minutes formatted as "hours:minutes".
     */
    public static getHoursDoneByWeek(preachingsOfWeek: PreachingEntity[]): string {
        const hours = Time.sumHours(preachingsOfWeek.map(p => ({ init: p.initHour, finish: p.finalHour })));
        const { restMins } = Time.sumMins(preachingsOfWeek.map(p => ({ init: p.initHour, finish: p.finalHour })));

        return `${ hours }:${ (restMins === 0) ? '00' : restMins }`;
    }

    /**
     * Calculates the required weekly hours based on a given total hours requirement over 28 days.
     *
     * @param {number} hoursRequirement - The total hours requirement over the period.
     * @return {string} The required hours per week formatted as "hours:minutes".
     */
    public static getHoursRequirementByWeek(hoursRequirement: number): string {
        const hoursByDay = hoursRequirement / 28;
        const hourByWeek = Math.floor(hoursByDay * 7);
        const minsByWeek = hoursByDay * 60 * 7;

        const minsRest = (Math.round(minsByWeek % 60) === 60)
            ? '00'
            : Math.round(minsByWeek % 60).toString();

        return `${ (minsRest === '00') ? hourByWeek + 1 : hourByWeek }:${ minsRest }`;
    }

    /**
     * Calculates the remaining hours requirement of the week based on the given required hours per week and hours done by week.
     *
     * @param {string} hoursRequirementByWeek - The required hours per week in the format "hours:minutes".
     * @param {string} hoursDoneByWeek - The hours done by week in the format "hours:minutes".
     * @return {RemainingHoursOfWeeklyRequirement} An object containing the remaining hours of the weekly requirement and a flag indicating if it is negative.
     */
    public static getRemainingHoursOfWeeklyRequirement(hoursRequirementByWeek: string, hoursDoneByWeek: string): RemainingHoursOfWeeklyRequirement {
        const [ hoursDone, minsDone ] = hoursDoneByWeek.split(':');
        const [ hoursRequired, minsRequired ] = hoursRequirementByWeek.split(':');

        const currentDate = new Date();

        const hours = Time.setHoursMinutesAndSecondsToDate(currentDate, Number(hoursDone), Number(minsDone), 0);
        const hoursByWeek = Time.setHoursMinutesAndSecondsToDate(currentDate, Number(hoursRequired), Number(minsRequired), 0);

        const hoursDiff = Time.getDiffBetweenDatesInHours(hoursByWeek, hours);
        const minsDiff = Time.getDiffBetweenDatesInMinutes(hoursByWeek, hours) % 60;

        const hoursToReturn = (hoursDiff < 0) ? hoursDiff * -1 : hoursDiff;
        const minsToReturn = (minsDiff < 0) ? minsDiff * -1 : minsDiff;

        return {
            remainingHoursOfWeeklyRequirement: `${ hoursToReturn }:${ (minsToReturn === 0) ? '00' : (minsToReturn.toString().length > 1) ? minsToReturn : `0${ minsToReturn }` }`,
            isNegative: (hoursDiff < 0 || minsDiff < 0)
        }
    }

    /**
     * Calculates the remaining hours requirement based on the preachings and the specified hours requirement.
     *
     * @param {PreachingEntity[]} preachings - The array of preachings to calculate hours from.
     * @param {number} hoursRequirement - The total hours required for the specified period.
     * @return {ReamainingOfHoursRequirement} - An object containing the remaining hours of the requirement and a flag indicating if it is negative.
     */
    public static getReamainingOfHoursRequirement(preachings: PreachingEntity[], hoursRequirement: number): ReamainingOfHoursRequirement {
        const hours = Time.sumHours(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));
        const restMins = Time.getRestMins(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));

        const currentDate = new Date()

        const dateWithHoursRequirement = Time.setHoursMinutesAndSecondsToDate(currentDate, hoursRequirement, 0, 0);
        const dateWithHoursDone = Time.setHoursMinutesAndSecondsToDate(currentDate, hours, restMins, 0);

        const hoursDiff = Time.getDiffBetweenDatesInHours(dateWithHoursRequirement, dateWithHoursDone);
        const minsDiff = Time.getDiffBetweenDatesInMinutes(dateWithHoursRequirement, dateWithHoursDone) % 60;

        const hoursToReturn = (hoursDiff < 0) ? hoursDiff * -1 : hoursDiff;
        const minsToReturn = (minsDiff < 0) ? minsDiff * -1 : minsDiff;

        return {
            reamainingOfHoursRequirement: `${ hoursToReturn }:${ (minsToReturn === 0) ? '00' : (minsToReturn.toString().length > 1) ? minsToReturn : `0${ minsToReturn }` }`,
            isNegative: (hoursDiff < 0 || minsDiff < 0)
        }
    }

    /**
     * Groups an array of PreachingEntity objects by month and year.
     *
     * @param {PreachingEntity[]} preachings - The array of PreachingEntity objects to group.
     * @returns {GroupedPreachingsModel[]} An array of GroupedPreachingsModel objects, where each object contains the month, year and an array of preachings for that month and year.
     */
    public static groupByMonthAndYear(preachings: PreachingEntity[]): GroupedPreachingsModel[] {
        return preachings.reduce((acc: GroupedPreachingsModel[], preaching) => {
            const month = Time.getMonthOfDate(preaching.day);
            const monthName = Time.getMonthName(month);

            const year = Time.getYearOfDate(preaching.day);

            let group = acc.find(g => g.month === monthName && g.year === year);

            if (!group) {
                group = { month: monthName, year, preachings: [] }
                acc.push(group);
            }

            group.preachings.push(preaching);
            return acc;
        }, []);
    }
}