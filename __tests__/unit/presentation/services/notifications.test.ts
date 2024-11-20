import { OneSignal } from 'react-native-onesignal';

/* Services */
import { NotificationsService } from '@services';

describe('Test in NotificationsService service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have respective methods', () => {
        expect(NotificationsService).toHaveProperty('close');
        expect(typeof NotificationsService.close).toBe('function');

        expect(NotificationsService).toHaveProperty('listenNotificationsByUser');
        expect(typeof NotificationsService.listenNotificationsByUser).toBe('function');

        expect(NotificationsService).toHaveProperty('mount');
        expect(typeof NotificationsService.mount).toBe('function');
    });

    it('should call functions to mount notifications - mount', () => {
        NotificationsService.mount();

        expect(OneSignal.Debug.setLogLevel).toHaveBeenCalledTimes(1);
        expect(OneSignal.Debug.setLogLevel).toHaveBeenCalledWith(expect.any(Number));

        expect(OneSignal.initialize).toHaveBeenCalledTimes(1);
        expect(OneSignal.initialize).toHaveBeenCalledWith(expect.any(String));
    });

    it('should call functions to close notifications - close', () => {
        NotificationsService.close();

        expect(OneSignal.logout).toHaveBeenCalledTimes(1);
    });

    it('should call functions to listen for notifications by user - listenNotificationsByUser', () => {
        const userId = '1c8ed605-81e1-402f-be40-b0fd1ff1906b';
        NotificationsService.listenNotificationsByUser(userId);

        expect(OneSignal.login).toHaveBeenCalledTimes(1);
        expect(OneSignal.login).toHaveBeenCalledWith(userId);
    });
});