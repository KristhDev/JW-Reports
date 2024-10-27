import DeviceInfoRN from 'react-native-device-info';

/* Adapters */
import { DeviceInfo } from '@infrasturcture/adapters';

describe('Test in DeviceInfo adapter', () => {
    it('should have respective methods', () => {
        expect(DeviceInfo).toHaveProperty('getBuildVersion');
        expect(typeof DeviceInfo.getBuildVersion).toBe('function');
        expect(DeviceInfo).toHaveProperty('getSystemVersion');
        expect(typeof DeviceInfo.getSystemVersion).toBe('function');
    });

    it('should get build version - getBuildVersion', () => {
        (DeviceInfoRN.getBuildNumber as jest.Mock).mockReturnValue('9102');

        const result = DeviceInfo.getBuildVersion();
        expect(result).toBe('9102');
    });

    it('should get system version - getSystemVersion', () => {
        (DeviceInfoRN.getSystemVersion as jest.Mock).mockReturnValue('12');

        const result = DeviceInfo.getSystemVersion();
        expect(result).toBe('12');
    });
});
