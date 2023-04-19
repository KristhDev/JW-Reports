import React, { useEffect, useState, FC, PropsWithChildren  } from 'react';
import NetInfo from '@react-native-community/netinfo';

/* Context */
import { NetworkContext } from './';

/**
 * This is a TypeScript React component that uses the useEffect hook to subscribe to changes in the
 * device's network connectivity status and provides the status to its children through a context
 * provider.
 * @param  - The code defines a functional component called `NetworkProvider` that takes in a single
 * prop called `children` of type `PropsWithChildren`. The `PropsWithChildren` type is a utility type
 * provided by React that allows components to accept children as props.
 * @returns The `NetworkProvider` component is being returned. It is a functional component that
 * provides network connectivity status to its children using the `NetworkContext` context. It
 * subscribes to changes in the device's network connectivity status using the `useEffect` hook and the
 * `NetInfo` API from `@react-native-community/netinfo`.
 */
const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ isConnected, setIsConnected ] = useState<boolean>(true);

    /* This code is using the `useEffect` hook to subscribe to changes in the device's network
    connectivity status using the `NetInfo` API from `@react-native-community/netinfo`. */
    useEffect(() => {
        const unSubscribreNetInfo = NetInfo.addEventListener((state) => {
            setIsConnected(state?.isConnected || false);
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