import { LogLevel, OneSignal } from 'react-native-onesignal';

/* Env */
import { ONESIGNAL_APP_ID } from '@env';

export class NotificationsService {
    /**
     * Mounts the OneSignal SDK and requests permission for notifications.
     *
     * @return {void} This function does not return anything.
     */
    public static mount(): void {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(ONESIGNAL_APP_ID);
    }

    /**
     * Listens for notifications by the specified user.
     *
     * @param {string} userId - The ID of the user to listen for notifications for.
     * @return {void} This function does not return anything.
     */
    public static listenNotificationsByUser(userId: string): void {
        OneSignal.login(userId);
    }

    /**
     * Closes the OneSignal SDK and logs out the current user.
     *
     * @return {void} This function does not return anything.
     */
    public static close(): void {
        OneSignal.logout();
    }
}
