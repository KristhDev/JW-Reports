import dayjs from 'dayjs';

/* Interfaces */
import { Preaching } from '../interfaces/preaching';

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
 * Calculates the remaining hours needed to meet the weekly requirement.
 *
 * @param {string} hoursRequirementByWeek - The weekly hour requirement in the format "HH:MM".
 * @param {string} hoursDoneByWeek - The hours and minutes worked in the week in the format "HH:MM".
 * @return {string} The remaining hours needed to meet the weekly requirement in the format "HH:MM".
 */
export const getRemainingHoursOfWeeklyRequirement = (hoursRequirementByWeek: string, hoursDoneByWeek: string): string => {
    const [ hoursDone, minsDone ] = hoursDoneByWeek.split(':');
    const [ hoursRequired, minsRequired ] = hoursRequirementByWeek.split(':');

    const hours = dayjs()
        .add(Number(hoursDone), 'hours')
        .add(Number(minsDone), 'minutes');

    const hoursByWeek = dayjs()
        .add(Number(hoursRequired), 'hours')
        .add(Number(minsRequired), 'minutes');

    const hoursDiff = hoursByWeek.diff(hours, 'hours');
    let minsDiff = hoursByWeek.diff(hours, 'minutes') % 60;

    minsDiff = (minsDiff < 0) ? minsDiff * -1 : minsDiff;

    return `${ hoursDiff }:${ (minsDiff === 0) ? '00' : minsDiff }`;
}

/**
 * Calculates the remaining hours required to meet the hours requirement.
 *
 * @param {Preaching[]} preachings - An array of preaching objects.
 * @param {number} hoursRequirement - The total number of hours required.
 * @return {string} - The remaining hours in the format "HH:MM".
 */
export const getReamainingOfHoursRequirement = (preachings: Preaching[], hoursRequirement: number): string => {
    const hours = sumHours(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour })));
    const restMins = getRestMins(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour })));

    const hoursRequirementWithDate = dayjs().add(hoursRequirement, 'hours');
    const hoursDoneWithDate = dayjs().add(hours, 'hours').add(restMins, 'minutes');

    const hoursDiff = hoursRequirementWithDate.diff(hoursDoneWithDate, 'hours');
    let minsDiff = hoursRequirementWithDate.diff(hoursDoneWithDate, 'minutes') % 60;

    minsDiff = (minsDiff < 0) ? minsDiff * -1 : minsDiff;

    return `${ hoursDiff }:${ (minsDiff === 0) ? '00' : minsDiff }`;
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