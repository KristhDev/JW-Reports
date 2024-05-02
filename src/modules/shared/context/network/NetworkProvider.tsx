import React, { useEffect, useState, FC, PropsWithChildren, useMemo  } from 'react';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';

/* Context */
import NetworkContext from './NetworkContext';

/* Interfaces */
import { Wifi } from '../../interfaces';

export const INIT_WIFI_STATE: Wifi = {
    isConnected: true,
    type: NetInfoStateType.unknown
}

/**
 * This code is using the `useEffect` hook to subscribe to changes in the device's
 * network connectivity status using the `NetInfo` API from `@react-native-community/netinfo`.
 *
 * @param {PropsWithChildren} props - The props object containing the children.
 * @return {JSX.Element} The rendered NetworkProvider component.
 */
const NetworkProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    const [ wifi, setWifi ] = useState<Wifi>(INIT_WIFI_STATE);

    /**
     * This code is using the `useEffect` hook to subscribe to changes in the device's
     * network connectivity status using the `NetInfo` API from `@react-native-community/netinfo`.
     */
    useEffect(() => {
        const unSubscribreNetInfo = NetInfo.addEventListener((state) => {
            setWifi({ isConnected: state?.isInternetReachable || false, type: state.type });
        });

        return () => {
            unSubscribreNetInfo();
        }
    }, []);

    const store = useMemo(() => ({ wifi }), [ wifi ]);

    return (
        <NetworkContext.Provider value={ store }>
            { children }
        </NetworkContext.Provider>
    );
}

export default NetworkProvider;