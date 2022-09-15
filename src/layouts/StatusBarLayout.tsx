import React, { FC, PropsWithChildren } from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from '../hooks';

interface Props {
    backgroundColor: string;
}

const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, backgroundColor }) => {
    const { state: { theme } } = useTheme();

    return (
        <>
            <StatusBar
                backgroundColor={ backgroundColor }
                barStyle={ (theme === 'dark') ? 'light-content' : 'dark-content' }
            />

            { children }
        </>
    );
}

export default AuthLayout;