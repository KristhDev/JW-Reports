import React, { useEffect, useState, FC, PropsWithChildren  } from 'react';
import NetInfo from '@react-native-community/netinfo';

/* Context */
import { NetworkContext } from './';

/**
 * This code is using the `useEffect` hook to subscribe to changes in the device's
 * network connectivity status using the `NetInfo` API from `@react-native-community/netinfo`.
 *
 * @param {PropsWithChildren} props - The props object containing the children.
 * @return {JSX.Element} The rendered NetworkProvider component.
 */
const NetworkProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    const [ isConnected, setIsConnected ] = useState<boolean>(true);

    /**
     * This code is using the `useEffect` hook to subscribe to changes in the device's
     * network connectivity status using the `NetInfo` API from `@react-native-community/netinfo`.
     */
    useEffect(() => {
        const unSubscribreNetInfo = NetInfo.addEventListener((state) => {
            setIsConnected(state?.isInternetReachable || false);
        });

        return () => {
            unSubscribreNetInfo();
        }
    }, []);

    return (
        <NetworkContext.Provider
            value={{ isConnected }}
        >
            { children }
        </NetworkContext.Provider>
    );
}

export default NetworkProvider;