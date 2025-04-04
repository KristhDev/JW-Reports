import { LogLevel, OneSignal } from 'react-native-onesignal';

/* Config */
import { env } from '@config/env';

/* Constants */
import { permissionsStatus } from '@application/constants';

/* Features */
import { PermissionStatus } from '@application/features';

/* Contracts */
import { NotificationsServiceContract } from '@domain/contracts/services';

export class NotificationsService extends NotificationsServiceContract {
    /**
     * Closes the OneSignal SDK and logs out the current user.
     *
     * @return {void} This function does not return anything.
     */
    public close(): void {
        OneSignal.logout();
    }

    /**
     * Gets the current permission status for the notifications permission.
     *
     * @returns {Promise<PermissionStatus>} A promise that resolves with the current permission status for the notifications permission.
     */
    public async getNotificationsPermission(): Promise<PermissionStatus> {
        const result = await OneSignal.Notifications.getPermissionAsync();
        return (result) ? permissionsStatus.GRANTED : permissionsStatus.DENIED;
    }

    /**
     * Listens for notifications by the specified user.
     *
     * @param {string} userId - The ID of the user to listen for notifications for.
     * @return {void} This function does not return anything.
     */
    public listenNotificationsByUser(userId: string): void {
        OneSignal.login(userId);
    }

    /**
     * Mounts the OneSignal SDK and requests permission for notifications.
     *
     * @return {void} This function does not return anything.
     */
    public mount(): void {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(env.ONESIGNAL_APP_ID!);
    }

    /**
     * Requests permission for notifications from the user.
     *
     * This method uses the OneSignal SDK to prompt the user for notifications permission.
     * It returns a promise that resolves with the permission status, which can be either 'granted' or 'denied'.
     *
     * @returns {Promise<PermissionStatus>} A promise that resolves with the current notifications permission status.
     */
    public async requestNotificationsPermission(): Promise<PermissionStatus> {
        const result = await OneSignal.Notifications.requestPermission(true);
        return (result) ? 'granted' : 'denied';
    }
}
