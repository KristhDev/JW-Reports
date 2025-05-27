import { useContext } from 'react';
import { Linking } from 'react-native';

import { loggerService, messagesService } from '@config/di';

import { ToasterContext, ToastOptions } from '@application/context';

import {
    CloudError,
    DtoError,
    EmailError,
    ExternalStorageError,
    ImageError,
    InternalStorageError,
    PDFError,
    RequestError,
    VoiceRecorderError
} from '@domain/errors';

import useTranslation from './useTranslation';

const useToaster = () => {
    const appMessages = messagesService.appMessages;
    const authMessages = messagesService.authMessages;
    const expoMessages = messagesService.expoMessages;
    const networkMessages = messagesService.networkMessages;
    const permissionsMessages = messagesService.permissionsMessages;
    const supabaseMessages = messagesService.supabaseMessages;

    const { showToast, hideToast } = useContext(ToasterContext);

    const { translate } = useTranslation();

    /**
     * This function is to set errors in status of store
     *
     * @param {unknown} error - The error to set
     * @return {void} This function does not return anything
     */
    const showError = (error: unknown, options?: ToastOptions): void => {
        let msg: string = appMessages.UNEXPECTED_ERROR;

        if (error instanceof RequestError) {
            const supabaseMsg = supabaseMessages.auth[error.code as keyof typeof supabaseMessages.auth]
                || supabaseMessages.postgres[error.code as keyof typeof supabaseMessages.postgres]
                || appMessages.UNEXPECTED_ERROR;

            msg = supabaseMsg;
        }

        if (error instanceof CloudError) {
            const supabaseMsg = supabaseMessages.storage[error.message as keyof typeof supabaseMessages.storage]
                || appMessages.UNEXPECTED_ERROR;

            msg = supabaseMsg;
        }

        if (error instanceof DtoError) msg = error.message;
        if (error instanceof EmailError) msg = error.message;
        if (error instanceof ExternalStorageError) msg = error.message;

        if (error instanceof ImageError) {
            msg = expoMessages.picker[error?.code as keyof typeof expoMessages.picker]
                || appMessages.UNEXPECTED_ERROR;
        }

        if (error instanceof InternalStorageError) msg = error.message;
        if (error instanceof PDFError) msg = error.message;

        if (error instanceof VoiceRecorderError) {
            msg = expoMessages.voiceRecorder[error?.code as keyof typeof expoMessages.voiceRecorder]
                || appMessages.UNEXPECTED_ERROR;
        }

        if (msg.trim().length === 0) msg = appMessages.UNEXPECTED_ERROR;

        showToast(msg, options);

        const errorData = ('toJson' in (error as any) && typeof (error as any).toJson === 'function')
            ? (error as any).toJson()
            : { ...(error as Error), message: (error as Error).message }

        console.error(JSON.stringify(errorData, null, 2));
        loggerService.error(errorData);
    }

    const showFormError = <T extends object>(fromErrors: T, options?: ToastOptions): void => {
        const values = Object.values(fromErrors) as string[];
        showToast(values[0], options);
    }

    /**
     * This function is to show a network error
     *
     * @param {string} msg - An optional error message.
     * @param {function} onDispatch - An optional function to be called on dispatch.
     * @return {void} This function does not return anything
     */
    const showNetworkError = (msg?: string, onDispatch?: () => void): void => {
        onDispatch && onDispatch();
        showToast(msg || networkMessages.WIFI_HASNT_CONNEC_EXPLAIN);
    }

    const showPermissionsToast = (): void => {
        showToast(permissionsMessages.REQUEST, {
            autoClose: false,
            cancelAction: {
                label: translate('forms.actions.cancel'),
                onPress: hideToast
            },
            confirmAction: {
                label: translate('forms.actions.settings'),
                onPress: () => {
                    Linking.openSettings()
                    hideToast()
                }
            }
        });
    }

    /**
     * This function is to show an unauthenticated error
     *
     * @param {() => void} onDispatch - An optional function to be triggered.
     * @param {ToastOptions} options - An optional object to be passed to the toast.
     * @return {void} This function does not return anything
     */
    const showUnauthenticatedError = (onDispatch?: () => void, options?: ToastOptions): void => {
        onDispatch && onDispatch();
        showToast(authMessages.UNAUTHENTICATED, options);
    }

    return {
        showToast,
        hideToast,

        showError,
        showFormError,
        showNetworkError,
        showPermissionsToast,
        showUnauthenticatedError
    }
}

export default useToaster;
