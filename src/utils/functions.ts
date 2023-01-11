export const waitToCall = (callback: () => void, time: number = 100) => {
    setTimeout(callback, time);
}