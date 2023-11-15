import { NetInfoStateType } from '@react-native-community/netinfo';

/* Context */
import { Wifi } from '../../src/context';

export const wifiMock: Wifi = {
    isConnected: true,
    type: NetInfoStateType.wifi
}