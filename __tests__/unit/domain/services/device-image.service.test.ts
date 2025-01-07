/* Services */
import { DeviceImageService } from '@domain/services';

describe('Test in DeviceImageService', () => {
    it('should have respective methods', () => {
        expect(DeviceImageService).toHaveProperty('clean');
        expect(typeof DeviceImageService.clean).toBe('function');

        expect(DeviceImageService).toHaveProperty('openCamera');
        expect(typeof DeviceImageService.openCamera).toBe('function');

        expect(DeviceImageService).toHaveProperty('openPicker');
        expect(typeof DeviceImageService.openPicker).toBe('function');
    });
});