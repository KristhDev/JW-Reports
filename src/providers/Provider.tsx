import React, { FC, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { MenuProvider } from 'react-native-popup-menu';

/* Features */
import { store, persistor } from '@features';

/* Modules */
import { NetworkProvider } from '@shared';
import { ThemeProvider } from '@theme';

/**
 * A React functional component that wraps its children with various providers.
 *
 * @param {PropsWithChildren} props - The component props.
 * @param {ReactNode} props.children - The children to be wrapped by the providers.
 * @return {JSX.Element} The wrapped children wrapped in the NetworkProvider, MenuProvider, ThemeProvider, ReduxProvider, and PersistGate components.
 */
const Provider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    return (
        <KeyboardProvider>
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
        </KeyboardProvider>
    );
}

export default Provider;