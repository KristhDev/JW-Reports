import { FC, JSX, PropsWithChildren, useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';
import Toast, { ToastConfigParams } from 'react-native-toast-message';

import { Toaster, ToasterProps } from '@ui/components';

import { useAuth } from '@auth/hooks';

const Provider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    const { state: { isAuthenticated } } = useAuth();
    const { theme: { colors, margins } } = useStyles();

    const bottomOffset = useMemo(() => (isAuthenticated) 
        ? (margins.lg * 2) + margins.xs 
        : margins.xs,
    [ isAuthenticated, margins ]);

    const toastStyle = useMemo<ToasterProps['style']>(() => ({
        backgroundColor: (isAuthenticated) ? colors.contentHeader : colors.background
    }), [ isAuthenticated, colors ]);

    return (
        <>
            { children }

            <Toast 
                autoHide
                bottomOffset={ bottomOffset }
                config={{
                    toast: ({
                        text1 = '',
                        hide,
                        props
                    }: ToastConfigParams<Omit<ToasterProps, 'onClose' | 'message'>>) => (
                        <Toaster 
                            cancelAction={ props.cancelAction }
                            confirmAction={ props.confirmAction }
                            message={ text1 }
                            onClose={ hide }
                            style={[ toastStyle, props.style ]}
                            textStyle={[ props.textStyle ]}
                        />
                    )
                }}
                position="bottom"
                visibilityTime={ 3000 }
            />
        </>
    );
}

export default Provider;