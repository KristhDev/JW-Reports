import dayjs from 'dayjs';

import { Preaching, ReamainingOfHoursRequirement, RemainingHoursOfWeeklyRequirement } from '../interfaces';

import { date } from '../../../utils';

export const report = {
    getHoursDoneByWeek: (preachingsOfWeek: Preaching[]): string => {
        const hours = date.sumHours(preachingsOfWeek.map(p => ({ init: p.initHour, finish: p.finalHour })));
        const { restMins } = date.sumMins(preachingsOfWeek.map(p => ({ init: p.initHour, finish: p.finalHour })));

        return `${ hours }:${ (restMins === 0) ? '00' : restMins }`;
    },

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