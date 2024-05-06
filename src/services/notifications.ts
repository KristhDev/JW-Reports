import { LogLevel, OneSignal } from 'react-native-onesignal';

/* Env */
import { ONESIGNAL_APP_ID } from '@env';

export const notifications = {
    listen: () => {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(ONESIGNAL_APP_ID);

        OneSignal.Notifications.requestPermission(true);
    }
}