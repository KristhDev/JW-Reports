import { useContext } from 'react';

/* Context */
import { NetworkContext } from '../context';

/* Interfaces */
import { NetworkContextProps } from '../interfaces';

/**
 * A hook that returns the network context.
 *
 * @return {NetworkContextProps} The network context.
 */
const useNetwork = (): NetworkContextProps => {
    return useContext(NetworkContext);
}

export default useNetwork;