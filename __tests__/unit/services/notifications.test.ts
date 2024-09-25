import { OneSignal } from 'react-native-onesignal';

/* Services */
import { notifications } from '@services';

describe('Test in notifications service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have respective methods', () => {
        expect(notifications).toEqual({
            close: expect.any(Function),
            listenNotificationsByUser: expect.any(Function),
            mount: expect.any(Function),
            requestPermission: expect.any(Function)
        });
    });

    it('should call functions to mount notifications - mount', () => {
        notifications.mount();

        expect(OneSignal.Debug.setLogLevel).toHaveBeenCalledTimes(1);
        expect(OneSignal.Debug.setLogLevel).toHaveBeenCalledWith(expect.any(Number));

        expect(OneSignal.initialize).toHaveBeenCalledTimes(1);
        expect(OneSignal.initialize).toHaveBeenCalledWith(expect.any(String));
    });

    it('should call functions to close notifications - close', () => {
        notifications.close();

        expect(OneSignal.logout).toHaveBeenCalledTimes(1);
    });

    it('should call functions to request permission - requestPermission', () => {
        notifications.requestPermission();

        expect(OneSignal.Notifications.requestPermission).toHaveBeenCalledTimes(1);
        expect(OneSignal.Notifications.requestPermission).toHaveBeenCalledWith(true);
    });

    it('should call functions to listen for notifications by user - listenNotificationsByUser', () => {
        const userId = '1c8ed605-81e1-402f-be40-b0fd1ff1906b';
        notifications.listenNotificationsByUser(userId);

        expect(OneSignal.login).toHaveBeenCalledTimes(1);
        expect(OneSignal.login).toHaveBeenCalledWith(userId);
    });
});