import React, { FC, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';

/* Features */
import { store, persistor } from '../features';

/* Modules */
import { NetworkProvider } from '../modules/shared';
import { ThemeProvider } from '../modules/theme';

/**
 * A React functional component that wraps its children with various providers.
 *
 * @param {PropsWithChildren} props - The component props.
 * @param {ReactNode} props.children - The children to be wrapped by the providers.
 * @return {JSX.Element} The wrapped children wrapped in the NetworkProvider, MenuProvider, ThemeProvider, ReduxProvider, and PersistGate components.
 */
const Provider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    return (
        <SafeAreaProvider>
            <NetworkProvider>
                <MenuProvider>
                    <ThemeProvider>
                        <ReduxProvider store={ store }>
                            <PersistGate loading={ null } persistor={ persistor }>
                                { children }
                            </PersistGate>
                        </ReduxProvider>
                    </ThemeProvider>
                </MenuProvider>
            </NetworkProvider>
        </SafeAreaProvider>
    );
}

export default Provider;