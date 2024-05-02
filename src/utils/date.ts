import dayjs from 'dayjs';

export const date = {
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

    sumNumbers: (numbers: number[]): number => {
        return numbers.reduce((total, number) => total + number, 0);
    },

    getRestMins: (dates: { init: string, finish: string }[]): number => {
        const { restMins } = date.sumMins(dates);
        return restMins;
    }
}