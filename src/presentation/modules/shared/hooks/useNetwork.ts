import { useContext } from 'react';

/* DI */
import { toasterAdapter } from '@config/di';

/* Context */
import { NetworkContext, NetworkContextProps } from '@application/context';

/**
 * A hook that returns the network context.
 *
 * @return {NetworkContextProps} The network context.
 */
const useNetwork = (): NetworkContextProps & { hasWifiConnection: (msg?: string) => boolean } => {
    const context = useContext(NetworkContext);

    const hasWifiConnection = (msg?: string): boolean => {
        const value = context.wifi.hasConnection;

        if (!value) toasterAdapter.showNetworkError(msg);
        return value;
    }

    return {
        ...context,
        hasWifiConnection
    }
}

export default useNetwork;