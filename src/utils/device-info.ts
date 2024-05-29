import DeviceInfo from 'react-native-device-info';

export const deviceInfo = {

    /**
     * Retrieves the system version of the device.
     *
     * @return {string} The system version of the device.
     */
    getSystemVersion: (): string => {
        return DeviceInfo.getSystemVersion();
    }
}