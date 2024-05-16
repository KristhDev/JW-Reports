import { NetInfoStateType } from '@react-native-community/netinfo';

/* Context */
import { Wifi } from '../../src/modules/shared';

export const wifiMock: Wifi = {
    isConnected: true,
    type: NetInfoStateType.wifi
}