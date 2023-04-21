import { createContext } from 'react';

export interface NetworkContextProps {
    isConnected: boolean;
}

/* This line of code is creating a new context object using the `createContext` function from the React
library. The `createContext` function takes a generic type argument that specifies the shape of the
context object. In this case, the generic type argument is `NetworkContextProps`, which is an
interface that defines a single property `isConnected` of type boolean. */
const NetworkContext = createContext<NetworkContextProps>({} as NetworkContextProps);

export default NetworkContext;