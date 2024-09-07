import DeviceInfo from 'react-native-device-info';

export const deviceInfo = {

    /**
     * A function that retrieves the build version.
     *
     * @return {string} The build version.
     */
    getBuildVersion: (): string => {
        return DeviceInfo.getBuildNumber();
    },

    /**
     * Retrieves the system version of the device.
     *
     * @return {string} The system version of the device.
     */
    getSystemVersion: (): string => {
        return DeviceInfo.getSystemVersion();
    }
}