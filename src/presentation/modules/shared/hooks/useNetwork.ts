import { useContext } from 'react';

/* Context */
import { NetworkContext, NetworkContextProps } from '@application/context';

/* Hooks */
import { useToaster } from '@ui/hooks';

/**
 * A hook that returns the network context.
 *
 * @return {NetworkContextProps} The network context.
 */
const useNetwork = (): NetworkContextProps & { hasWifiConnection: (msg?: string) => boolean } => {
    const context = useContext(NetworkContext);
    const { showNetworkError } = useToaster();

    const hasWifiConnection = (msg?: string): boolean => {
        const value = context.wifi.hasConnection;

        if (!value) showNetworkError(msg);
        return value;
    }

    return {
        ...context,
        hasWifiConnection
    }
}

export default useNetwork;