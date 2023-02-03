import dayjs from 'dayjs';

/**
 * It takes an array of numbers and returns the sum of all the numbers in the array.
 * @param {number[]} numbers - number[] - an array of numbers
 * @returns The sum of the numbers in the array.
 */
export const sumNumbers = (numbers: number[]) => {
    return numbers.reduce((total, number) => total + number, 0);
}

/**
 * It takes an array of objects with two properties, init and finish, and returns the sum of the hours
 * between the two dates
 * @param {{ init: string, finish: string }[]} dates - { init: string, finish: string }[]
 * @returns The sum of the hours between the dates.
 */
export const sumHours = (dates: { init: string, finish: string }[]) => {
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
 * It takes an array of objects with two properties, init and finish, and returns the sum of the
 * difference between the init and finish properties.
 * @param {{ init: string, finish: string }[]} dates - { init: string, finish: string }[]
 * @returns The restMins value from the sumMins function.
 */
export const getRestMins = (dates: { init: string, finish: string }[]) => {
    const { restMins } = sumMins(dates);

    return restMins;
}

/**
 * It takes an array of objects with two properties, init and finish, and returns an object with two
 * properties, hours and restMins
 * @param {{ init: string, finish: string }[]} dates - { init: string, finish: string }[]
 * @returns An object with two properties, hours and restMins
 */
export const sumMins = (dates: { init: string, finish: string }[]) => {
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