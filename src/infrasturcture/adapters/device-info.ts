import DeviceInfoRN from 'react-native-device-info';

export class DeviceInfo {
    /**
     * A function that retrieves the build version.
     *
     * @return {string} The build version.
     */
    public static getBuildVersion(): string {
        return DeviceInfoRN.getBuildNumber();
    }

    /**
     * Retrieves the system version of the device.
     *
     * @return {string} The system version of the device.
     */
    public static getSystemVersion(): string {
        return DeviceInfoRN.getSystemVersion();
    }
}