import { NetInfoStateType } from '@react-native-community/netinfo';
import { Wifi } from '@application/context';

export const wifiMock: Wifi = {
    hasConnection: true,
    type: NetInfoStateType.wifi
}