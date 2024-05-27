import { createContext } from 'react';

/* Interfaces */
import { NetworkContextProps } from '../../interfaces';

/**
 * Creates a context for the network context.
 */
const NetworkContext = createContext<NetworkContextProps>({} as NetworkContextProps);

export default NetworkContext;