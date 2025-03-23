import * as Application from 'expo-application';

export class DeviceInfo {
    /**
     * A function that retrieves the build version.
     *
     * @return {string} The build version.
     */
    public static getBuildVersion(): string {
        return Application.nativeBuildVersion || '1';
    }

    /**
     * Retrieves the system version of the device.
     *
     * @return {string} The system version of the device.
     */
    public static getSystemVersion(): string {
        return Application.nativeApplicationVersion || '1.0.0';
    }
}