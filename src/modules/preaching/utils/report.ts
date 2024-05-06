import dayjs from 'dayjs';

/* Interfaces */
import { Preaching, ReamainingOfHoursRequirement, RemainingHoursOfWeeklyRequirement } from '../interfaces';

/* Utils */
import { date } from '../../../utils';

export const report = {
    /**
     * Calculates the total hours worked in a week based on the given array of preachings.
     *
     * @param {Preaching[]} preachingsOfWeek - An array of preaching objects representing the preachings of a week.
     * @return {string} The total hours worked in the week formatted as "hours:minutes".
     */
    getHoursDoneByWeek: (preachingsOfWeek: Preaching[]): string => {
        const hours = date.sumHours(preachingsOfWeek.map(p => ({ init: p.initHour, finish: p.finalHour })));
        const { restMins } = date.sumMins(preachingsOfWeek.map(p => ({ init: p.initHour, finish: p.finalHour })));

        return `${ hours }:${ (restMins === 0) ? '00' : restMins }`;
    },

    /**
     * Calculates the required hours per week based on the given total hours requirement.
     *
     * @param {number} hoursRequirement - The total hours requirement.
     * @return {string} The required hours per week formatted as "hours:minutes".
     */
    getHoursRequirementByWeek: (hoursRequirement: number): string => {
        const hoursByDay = hoursRequirement / 28;
        const minsByDay = hoursByDay * 60;
        const minsByWeek = minsByDay * 7;

        const hourByWeek = Math.floor(minsByWeek / 60);

        const minsRest = (Math.round(minsByWeek % 60) === 60)
            ? '00'
            : Math.round(minsByWeek % 60);

        return `${ (minsRest === '00') ? hourByWeek + 1 : hourByWeek }:${ minsRest }`;
    },

    /**
     * Calculates the remaining hours of the weekly requirement based on the given hours requirement by week and hours done by week.
     *
     * @param {string} hoursRequirementByWeek - The hours requirement by week in the format "hours:minutes".
     * @param {string} hoursDoneByWeek - The hours done by week in the format "hours:minutes".
     * @return {RemainingHoursOfWeeklyRequirement} - An object containing the remaining hours of the weekly requirement and a flag indicating if it is negative.
     */
    getRemainingHoursOfWeeklyRequirement: (hoursRequirementByWeek: string, hoursDoneByWeek: string): RemainingHoursOfWeeklyRequirement => {
        const [ hoursDone, minsDone ] = hoursDoneByWeek.split(':');
        const [ hoursRequired, minsRequired ] = hoursRequirementByWeek.split(':');

        const hours = dayjs()
            .add(Number(hoursDone), 'hours')
            .add(Number(minsDone), 'minutes');

        const hoursByWeek = dayjs()
            .add(Number(hoursRequired), 'hours')
            .add(Number(minsRequired), 'minutes');

        const hoursDiff = hoursByWeek.diff(hours, 'hours');
        const minsDiff = hoursByWeek.diff(hours, 'minutes') % 60;

        const hoursToReturn = (hoursDiff < 0) ? hoursDiff * -1 : hoursDiff;
        const minsToReturn = (minsDiff < 0) ? minsDiff * -1 : minsDiff;

        return {
            remainingHoursOfWeeklyRequirement: `${ hoursToReturn }:${ (minsToReturn === 0) ? '00' : (minsToReturn.toString().length > 1) ? minsToReturn : `0${ minsToReturn }` }`,
            isNegative: (hoursDiff < 0 || minsDiff < 0)
        }
    },

    /**
     * Calculates the remaining hours of the requirement based on the preachings and the specified hours requirement.
     *
     * @param {Preaching[]} preachings - The array of preachings to calculate hours from.
     * @param {number} hoursRequirement - The total hours required for the specified period.
     * @return {ReamainingOfHoursRequirement} - An object containing the remaining hours of the requirement and a flag indicating if it is negative.
     */
    getReamainingOfHoursRequirement: (preachings: Preaching[], hoursRequirement: number): ReamainingOfHoursRequirement => {
        const hours = date.sumHours(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));
        const restMins = date.getRestMins(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));

        const hoursRequirementWithDate = dayjs().add(hoursRequirement, 'hours');
        const hoursDoneWithDate = dayjs().add(hours, 'hours').add(restMins, 'minutes');

        const hoursDiff = hoursRequirementWithDate.diff(hoursDoneWithDate, 'hours');
        const minsDiff = hoursRequirementWithDate.diff(hoursDoneWithDate, 'minutes') % 60;

        const hoursToReturn = (hoursDiff < 0) ? hoursDiff * -1 : hoursDiff;
        const minsToReturn = (minsDiff < 0) ? minsDiff * -1 : minsDiff;

        return {
            reamainingOfHoursRequirement: `${ hoursToReturn }:${ (minsToReturn === 0) ? '00' : (minsToReturn.toString().length > 1) ? minsToReturn : `0${ minsToReturn }` }`,
            isNegative: (hoursDiff < 0 || minsDiff < 0)
        }
    }
}