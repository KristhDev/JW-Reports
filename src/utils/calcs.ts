import dayjs from 'dayjs';

/* Interfaces */
import { Preaching, ReamainingOfHoursRequirement, RemainingHoursOfWeeklyRequirement } from '../interfaces/preaching';

/**
 * Calculates the total number of hours worked in a week based on the given array of preaching objects.
 *
 * @param {Preaching[]} preachingsOfWeek - An array of preaching objects representing the preachings done in a week.
 * @return {string} A string representing the total number of hours worked in the week, in the format "hours:minutes".
 */
export const getHoursDoneByWeek = (preachingsOfWeek: Preaching[]): string => {
    const hours = sumHours(preachingsOfWeek.map(p => ({ init: p.init_hour, finish: p.final_hour })));
    const { restMins } = sumMins(preachingsOfWeek.map(p => ({ init: p.init_hour, finish: p.final_hour })));

    return `${ hours }:${ (restMins === 0) ? '00' : restMins }`;
}

/**
 * Calculates the number of hours required per week based on the total hours requirement.
 *
 * @param {number} hoursRequirement - The total hours requirement.
 * @return {string} - The number of hours required per week in the format 'HH:MM'.
 */
export const getHoursRequirementByWeek = (hoursRequirement: number): string => {
    const hoursByDay = hoursRequirement / 28;
    const minsByDay = hoursByDay * 60;
    const minsByWeek = minsByDay * 7;

    const hourByWeek = Math.floor(minsByWeek / 60);

    const minsRest = (Math.round(minsByWeek % 60) === 60)
        ? '00'
        : Math.round(minsByWeek % 60);

    return `${ (minsRest === '00') ? hourByWeek + 1 : hourByWeek }:${ minsRest }`;
}

/**
 * Calculates the remaining hours of the weekly requirement based on the hours
 * requirement by week and the hours done by week.
 *
 * @param {string} hoursRequirementByWeek - The hours requirement by week in the format "HH:mm".
 * @param {string} hoursDoneByWeek - The hours done by week in the format "HH:mm".
 * @return {RemainingHoursOfWeeklyRequirement} An object containing the remaining hours of the weekly requirement and a flag indicating if it's negative.
 */
export const getRemainingHoursOfWeeklyRequirement = (hoursRequirementByWeek: string, hoursDoneByWeek: string): RemainingHoursOfWeeklyRequirement => {
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
}


/**
 * Calculates the remaining hours requirement based on the given list of preachings and hours requirement.
 *
 * @param {Preaching[]} preachings - The list of preachings.
 * @param {number} hoursRequirement - The required number of hours.
 * @return {ReamainingOfHoursRequirement} - An object containing the remaining hours requirement and a flag indicating if it is negative.
 */
export const getReamainingOfHoursRequirement = (preachings: Preaching[], hoursRequirement: number): ReamainingOfHoursRequirement => {
    const hours = sumHours(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour })));
    const restMins = getRestMins(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour })));

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

/**
 * It takes an array of objects with two properties, init and finish, and returns the sum of the
 * difference between the init and finish properties.
 *
 * @param {{ init: string, finish: string }[]} dates - { init: string, finish: string }[]
 * @return {number} The restMins value from the sumMins function.
 */
export const getRestMins = (dates: { init: string, finish: string }[]): number => {
    const { restMins } = sumMins(dates);

    return restMins;
}

/**
 * It takes an array of objects with two properties, init and finish, and returns the sum of the hours
 * between the two dates
 *
 * @param {{ init: string, finish: string }[]} dates - { init: string, finish: string }[]
 * @return {number} The sum of the hours between the dates.
 */
export const sumHours = (dates: { init: string, finish: string }[]): number => {
    const hours = dates.map(date => {
        const start = dayjs(date.init);
        const end = dayjs(date.finish);

        return end.diff(start, 'hours');
    });

    const { hours: minHours } = sumMins(dates);

    return (minHours >= 1)
        ? minHours + sumNumbers(hours)
        : sumNumbers(hours);
}

/**
 * It takes an array of objects with two properties, init and finish, and returns an object with two
 * properties, hours and restMins
 *
 * @param {{ init: string, finish: string }[]} dates - { init: string, finish: string }[]
 * @returns {{ hours: number, restMins: number }} An object with two properties, hours and restMins
 */
export const sumMins = (dates: { init: string, finish: string }[]): { hours: number, restMins: number } => {
    const mins = dates.map(date => {
        const start = dayjs(date.init, 'HH:mm');
        const end = dayjs(date.finish, 'HH:mm');

        const diff = end.diff(start, 'minute');

        const hours = Math.floor(diff / 60);
        const restMins = diff - (hours * 60);

        return restMins;
    });

    const totalMins = sumNumbers(mins);
    const restMins = totalMins % 60;

    return {
        hours: Math.floor(totalMins / 60),
        restMins
    }
}

/**
 * It takes an array of numbers and returns the sum of all the numbers in the array.
 *
 * @param {number[]} numbers - number[] - an array of numbers
 * @return {number} The sum of the numbers in the array.
 */
export const sumNumbers = (numbers: number[]): number => {
    return numbers.reduce((total, number) => total + number, 0);
}