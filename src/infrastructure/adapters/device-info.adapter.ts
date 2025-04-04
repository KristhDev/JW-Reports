import * as Application from 'expo-application';

import { DeviceInfoAdapterContract } from '@domain/contracts/adapters';

export class DeviceInfoAdapter implements DeviceInfoAdapterContract {
    /**
     * A function that retrieves the build version.
     *
     * @return {string} The build version.
     */
    public getBuildVersion(): string {
        return Application.nativeBuildVersion || '1';
    }

    /**
     * Retrieves the system version of the device.
     *
     * @return {string} The system version of the device.
     */
    public getSystemVersion(): string {
        return Application.nativeApplicationVersion || '1.0.0';
    }
}