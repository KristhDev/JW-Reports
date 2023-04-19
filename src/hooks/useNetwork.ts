import { useContext } from 'react';

/* Context */
import { NetworkContext } from '../context/network';

/**
 * This function returns the context of the network.
 * @returns The `useNetwork` function is returning the value of the `NetworkContext` using the
 * `useContext` hook.
 */
const useNetwork = () => {
    return useContext(NetworkContext);
}

export default useNetwork;