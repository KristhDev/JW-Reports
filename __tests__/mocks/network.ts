import { NetInfoStateType } from '@react-native-community/netinfo';

/* Context */
import { Wifi } from '@shared';

export const wifiMock: Wifi = {
    hasConnection: true,
    type: NetInfoStateType.wifi
}