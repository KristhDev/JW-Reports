import dayjs from 'dayjs';

export const sumNumbers = (numbers: number[]) => {
    return numbers.reduce((total, number) => total + number, 0);
}

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

export const getRestMins = (dates: { init: string, finish: string }[]) => {
    const { restMins } = sumMins(dates);

    return restMins;
}

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