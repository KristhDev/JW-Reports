import React, { FC, PropsWithChildren, useMemo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { UnistylesProvider, useStyles } from 'react-native-unistyles';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';

/* Features */
import { store, persistor } from '@application/store';

/* Context */
import { NetworkProvider, ThemeProvider, ToasterProvider, ToasterProviderProps } from '@application/context';

/* Hooks */
import { useAuth } from '@auth/hooks';

const Toaster: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    const { state: { isAuthenticated } } = useAuth();
    const { theme: { colors, margins } } = useStyles();

    const toastStyle = useMemo<ToasterProviderProps['toastStyle']>(() => ({
        backgroundColor: (isAuthenticated) ? colors.contentHeader : colors.background,
        bottom: (isAuthenticated) ? (margins.lg * 2) + margins.xs : margins.xs,
    }), [ isAuthenticated, colors, margins ]);

    return (
        <ToasterProvider
            toastStyle={ toastStyle }
        >
            { children }
        </ToasterProvider>
    );
}

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
                    <ThemeProvider>
                        <MenuProvider>
                            <ReduxProvider store={ store }>
                                <PersistGate loading={ null } persistor={ persistor }>
                                    <Toaster>
                                        { children }
                                    </Toaster>
                                </PersistGate>
                            </ReduxProvider>
                        </MenuProvider>
                    </ThemeProvider>
                </NetworkProvider>
            </UnistylesProvider>
        </KeyboardProvider>
    );
}

export default Provider;