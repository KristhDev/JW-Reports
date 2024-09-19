import { deviceInfo } from '@utils';

describe('Test in device-info util', () => {
    it('should have respective methods', () => {
        expect(deviceInfo).toEqual({
            getBuildVersion: expect.any(Function),
            getSystemVersion: expect.any(Function)
        });
    });

    it('should get build version - getBuildVersion', () => {
        const result = deviceInfo.getBuildVersion();
        expect(result).toBe('9102');
    });

    it('should get system version - getSystemVersion', () => {
        const result = deviceInfo.getSystemVersion();
        expect(result).toBe('12');
    });
});
