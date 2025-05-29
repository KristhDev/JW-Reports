import { FC, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { UnistylesProvider } from 'react-native-unistyles';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';

/* Features */
import { store, persistor } from '@application/store';

/* Context */
import { NetworkProvider, ThemeProvider, ToasterProvider } from '@application/context';

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
                                    <ToasterProvider>
                                        { children }
                                    </ToasterProvider>
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