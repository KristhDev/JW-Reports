import { DeviceInfo } from '@infrasturcture/adapters';

describe('Test in DeviceInfo adapter', () => {
    it('should have respective methods', () => {
        expect(DeviceInfo).toHaveProperty('getBuildVersion');
        expect(typeof DeviceInfo.getBuildVersion).toBe('function');
        expect(DeviceInfo).toHaveProperty('getSystemVersion');
        expect(typeof DeviceInfo.getSystemVersion).toBe('function');
    });

    it('should get build version - getBuildVersion', () => {
        const result = DeviceInfo.getBuildVersion();
        expect(result).toBe('9102');
    });

    it('should get system version - getSystemVersion', () => {
        const result = DeviceInfo.getSystemVersion();
        expect(result).toBe('12');
    });
});
