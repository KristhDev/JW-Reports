import { FC, JSX, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

/* Context */
import ToasterContext from './ToasterContext';
import { ToasterContextProps, ToasterProviderProps, ToastOptions } from './types';

/* Components */
import { Toaster } from '@ui/components';

const defaultOptions: ToastOptions = {
    autoClose: true,
    duration: 3000
}

/**
 * Generates a set of options for a toast based on the default options and
 * any options provided.
 *
 * @param {ToastOptions} [options] - The options to generate.
 * @return {ToastOptions} The generated options.
 */
const generateOptions = (options?: ToastOptions): ToastOptions => {
    return {
        ...defaultOptions,
        ...options
    }
}

/**
 * A React functional component that wraps its children with a ToasterContext
 * provider. The toaster context provides a function to show a toast message
 * with the given options.
 *
 * @param {PropsWithChildren<ToasterProviderProps>} props - The component props.
 * @param {boolean} props.autoClose If the toast should close automatically after the given duration.
 * @param {ToastAction} props.cancelAction The action to be performed when the cancel button is pressed.
 * @param {ToastAction} props.confirmAction The action to be performed when the confirm button is pressed.
 * @param {number} props.duration The time in milliseconds to show the toast.
 * @param {StyleProp<ViewStyle>} props.toastStyle The style to be applied to the toast container.
 * @param {StyleProp<TextStyle>} props.toastTextStyle The style to be applied to the toast text.
 * @return {JSX.Element} The wrapped children wrapped in the ToasterContext provider.
 */
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

    /**
     * Hides the toaster and resets all its options to their default values.
     * 
     * @returns {void} This function does not return anything.
     */
    const hideToast = useCallback(() => {
        setShowToaster(false);
        setMessage('');

        setToastStyle([ toastStyleProp ]);
        setToastTextStyle([ toastTextStyleProp ]);
        setCancelAction(undefined);
        setConfirmAction(undefined);
    }, [ toastStyleProp, toastTextStyleProp, setCancelAction, setConfirmAction ]);

    /**
     * Shows a toast message with the given options.
     * 
     * @param {string} message The message to be shown in the toast.
     * @param {ToastOptions} [options] The options to customize the toast.
     * @property {boolean} options.autoClose If the toast should close automatically after the given duration.
     * @property {ToastAction} options.cancelAction The action to be performed when the cancel button is pressed.
     * @property {ToastAction} options.confirmAction The action to be performed when the confirm button is pressed.
     * @property {number} options.duration The time in milliseconds to show the toast.
     * @property {StyleProp<ViewStyle>} options.toastStyle The style to be applied to the toast container.
     * @property {StyleProp<TextStyle>} options.toastTextStyle The style to be applied to the toast text.
     * @returns {void} This function does not return anything.
     */
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