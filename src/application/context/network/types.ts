import { NetInfoStateType } from '@react-native-community/netinfo';

/* Defining the interface for wifi */
export interface Wifi {
    hasConnection: boolean;
    type: NetInfoStateType;
}

/** 
 * Defining the interface for the context.
 * 
 * @property {Wifi} wifi - The wifi.
 */
export interface NetworkContextProps {
    wifi: Wifi;
}