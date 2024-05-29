import { LogLevel, OneSignal } from 'react-native-onesignal';

/* Env */
import { ONESIGNAL_APP_ID } from '@env';

export const notifications = {
    /**
     * Mounts the OneSignal SDK and requests permission for notifications.
     *
     * @return {void} This function does not return anything.
     */
    mount: (): void => {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(ONESIGNAL_APP_ID);
    },

    /**
     * Listens for notifications by the specified user.
     *
     * @param {string} userId - The ID of the user to listen for notifications for.
     * @return {void} This function does not return anything.
     */
    listenNotificationsByUser: (userId: string): void => {
        OneSignal.login(userId);
    },

    /**
     * Closes the OneSignal SDK and logs out the current user.
     *
     * @return {void} This function does not return anything.
     */
    close: (): void => {
        OneSignal.logout();
    },

    /**
     * Requests permission for notifications from the OneSignal SDK.
     *
     * @return {void} This function does not return anything.
     */
    requestPermission: (): void => {
        OneSignal.Notifications.requestPermission(true);
    }
}