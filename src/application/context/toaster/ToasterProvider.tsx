import { FC, JSX, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import ToasterContext from './ToasterContext';
import { ToasterContextProps, ToasterProviderProps, ToastOptions } from './types';

import { Toaster } from '@ui/components';

const defaultOptions: ToastOptions = {
    autoClose: true,
    duration: 3000
};

const ToasterProvider: FC<PropsWithChildren<ToasterProviderProps>> = ({
    children,
    autoClose = true,
    duration = 3000,
    toastStyle: toastStyleProp,
    toastTextStyle: toastTextStyleProp,
}): JSX.Element => {
    const [ toastStyle, setToastStyle ] = useState<ToastOptions['toastStyle'][]>([ toastStyleProp ]);
    const [ toastTextStyle, setToastTextStyle ] = useState<ToastOptions['toastTextStyle'][]>([ toastTextStyleProp ]);

    const [ showToaster, setShowToaster ] = useState(false);
    const [ message, setMessage ] = useState('');

    const generateOptions = (options?: ToastOptions): ToastOptions => {
        return {
            ...defaultOptions,
            ...options
        };
    }

    const hideToast = useCallback(() => {
        setShowToaster(false);
        setMessage('');

        setToastStyle([ toastStyleProp ]);
        setToastTextStyle([ toastTextStyleProp ]);
    }, [ toastStyleProp, toastTextStyleProp ]);

    const showToast = useCallback((message: string, options?: ToastOptions) => {
        options = generateOptions(options);

        if (options?.toastStyle) {
            setToastStyle(prev => [ ...prev, options.toastStyle ]);
        }

        if (options?.toastTextStyle) {
            setToastTextStyle(prev => [ ...prev, options.toastTextStyle ]);
        }

        setMessage(message);
        setShowToaster(true);

        if (!options?.autoClose || !autoClose) return;

        const timer = setTimeout(() => {
            hideToast();
            clearTimeout(timer);
        }, options?.duration || duration);
    }, [ autoClose, duration, hideToast ]);

    const value = useMemo<ToasterContextProps>(() => ({
        showToast,
        hideToast
    }), [
        showToast,
        hideToast
    ]);

    useEffect(() => {
        setToastStyle([ toastStyleProp ]);
    }, [ toastStyleProp ]);

    useEffect(() => {
        setToastTextStyle([ toastTextStyleProp ]);
    }, [ toastTextStyleProp ]);

    return (
        <ToasterContext.Provider value={ value }>
            { children }

            { (showToaster) && (
                <Toaster 
                    message={ message }
                    style={ toastStyle }
                    textStyle={ toastTextStyle }
                />
            ) }
        </ToasterContext.Provider>
    );
}

export default ToasterProvider;