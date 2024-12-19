import React, { FC, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { UnistylesProvider } from 'react-native-unistyles';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { MenuProvider } from 'react-native-popup-menu';

/* Features */
import { store, persistor } from '@application/store';

/* Context */
import { NetworkProvider, ThemeProvider } from '@application/context';

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
            <UnistylesProvider>
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
            </UnistylesProvider>
        </KeyboardProvider>
    );
}

export default Provider;