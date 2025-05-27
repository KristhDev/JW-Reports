import { FC, JSX, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import ToasterContext from './ToasterContext';
import { ToasterContextProps, ToasterProviderProps, ToastOptions } from './types';

import { Toaster } from '@ui/components';

const defaultOptions: ToastOptions = {
    autoClose: true,
    duration: 3000
}

const generateOptions = (options?: ToastOptions): ToastOptions => {
    return {
        ...defaultOptions,
        ...options
    }
}

const ToasterProvider: FC<PropsWithChildren<ToasterProviderProps>> = ({
    autoClose = true,
    cancelAction: cancelActionProp,
    children,
    confirmAction: confirmActionProp,
    duration = 3000,
    toastStyle: toastStyleProp,
    toastTextStyle: toastTextStyleProp,
}): JSX.Element => {
    const [ cancelAction, setCancelAction ] = useState<ToastOptions['cancelAction']>(cancelActionProp);
    const [ confirmAction, setConfirmAction ] = useState<ToastOptions['confirmAction']>(confirmActionProp);

    const [ toastStyle, setToastStyle ] = useState<ToastOptions['toastStyle'][]>([ toastStyleProp ]);
    const [ toastTextStyle, setToastTextStyle ] = useState<ToastOptions['toastTextStyle'][]>([ toastTextStyleProp ]);

    const [ showToaster, setShowToaster ] = useState(false);
    const [ message, setMessage ] = useState('');

    const hideToast = useCallback(() => {
        setShowToaster(false);
        setMessage('');

        setToastStyle([ toastStyleProp ]);
        setToastTextStyle([ toastTextStyleProp ]);
        setCancelAction(undefined);
        setConfirmAction(undefined);
    }, [ toastStyleProp, toastTextStyleProp, setCancelAction, setConfirmAction ]);

    const showToast = useCallback((message: string, options?: ToastOptions) => {
        options = generateOptions({ autoClose, duration, ...options });

        if (options?.cancelAction) {
            setCancelAction(options.cancelAction);
        }

        if (options?.confirmAction) {
            setConfirmAction(options.confirmAction);
        }

        if (options?.toastStyle) {
            setToastStyle(prev => [ ...prev, options.toastStyle ]);
        }

        if (options?.toastTextStyle) {
            setToastTextStyle(prev => [ ...prev, options.toastTextStyle ]);
        }

        setMessage(message);
        setShowToaster(true);

        if (!options?.autoClose) return;

        const timer = setTimeout(() => {
            hideToast();
            clearTimeout(timer);
        }, options?.duration);
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

    useEffect(() => {
        setCancelAction(cancelActionProp);
    }, [ cancelActionProp ]);

    useEffect(() => {
        setConfirmAction(confirmActionProp);
    }, [ confirmActionProp ]);

    return (
        <ToasterContext.Provider value={ value }>
            { children }

            { (showToaster) && (
                <Toaster 
                    cancelAction={ cancelAction }
                    confirmAction={ confirmAction }
                    message={ message }
                    style={ toastStyle }
                    textStyle={ toastTextStyle }
                />
            ) }
        </ToasterContext.Provider>
    );
}

export default ToasterProvider;