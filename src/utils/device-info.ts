import DeviceInfo from 'react-native-device-info';

export const deviceInfo = {
    getDeviceSystemVersion: () => DeviceInfo.getSystemVersion(),
}