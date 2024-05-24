import { NetInfoStateType } from '@react-native-community/netinfo';

/* Defining the interface for wifi */
export interface Wifi {
    isConnected: boolean;
    type: NetInfoStateType;
}

/* Defining the interface for the context. */
export interface NetworkContextProps {
    wifi: Wifi;
}