/* Services */
import { DeviceImageService } from '@domain/services';

describe('Test in DeviceImageService', () => {
    it('should have respective methods', () => {
        expect(DeviceImageService).toHaveProperty('getBase64FromUri');
        expect(typeof DeviceImageService.getBase64FromUri).toBe('function');

        expect(DeviceImageService).toHaveProperty('openCamera');
        expect(typeof DeviceImageService.openCamera).toBe('function');

        expect(DeviceImageService).toHaveProperty('openPicker');
        expect(typeof DeviceImageService.openPicker).toBe('function');
    });
});