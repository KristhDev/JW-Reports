import { useRouter } from 'expo-router';

/* Config */
import { loggerService, messagesService } from '@config/di';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import { clearStatus as clearStatusAction, setStatus as setStatusAction, SetStatusPayload } from '@application/features/status';

/* Errors */
import {
    CloudError,
    DtoError,
    EmailError,
    ExternalStorageError,
    InternalStorageError,
    ImageError,
    PDFError,
    RequestError,
    VoiceRecorderError
} from '@domain/errors';

/**
 * Hook to management status of store with state and actions
 */
const useStatus = () => {
    const appMessages = messagesService.appMessages;
    const authMessages = messagesService.authMessages;
    const expoMessages = messagesService.expoMessages;
    const networkMessages = messagesService.networkMessages;
    const supabaseMessages = messagesService.supabaseMessages;

    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.status);

    const router = useRouter();
    /**
     * Sets the status of the store and navigates to the modal page.
     *
     * @param {SetStatusPayload} status - The status to set.
     * @return {void} This function does not return anything
     */
    const setStatus = (status: SetStatusPayload): void => {
        dispatch(setStatusAction(status));
        router.navigate('/modal');
    }

    /**
     * Clears the current status by dismissing the modal and dispatching the clear action.
     *
     * @return {void} This function does not return anything.
     */
    const clearStatus = (): void => {
        router.dismiss();
        dispatch(clearStatusAction());
    }

    /**
     * This function is to set errors in status of store
     *
     * @param {unknown} error - The error to set
     * @return {void} This function does not return anything
     */
    const setError = (error: unknown): void => {
        let msg: string = appMessages.UNEXPECTED_ERROR;
        let status = 400;

        if (error instanceof RequestError) {
            const supabaseMsg = supabaseMessages.auth[error.code as keyof typeof supabaseMessages.auth]
                || supabaseMessages.postgres[error.code as keyof typeof supabaseMessages.postgres]
                || appMessages.UNEXPECTED_ERROR;

            msg = supabaseMsg;
            status = error.status;
        }

        if (error instanceof CloudError) {
            const supabaseMsg = supabaseMessages.storage[error.message as keyof typeof supabaseMessages.storage]
                || appMessages.UNEXPECTED_ERROR;

            msg = supabaseMsg;
            status = error.status;
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

        setStatus({ msg, code: status });

        const errorData = ('toJson' in (error as any) && typeof (error as any).toJson === 'function')
            ? (error as any).toJson()
            : { ...(error as Error), message: (error as Error).message }

        console.error(JSON.stringify(errorData, null, 2));
        loggerService.error(errorData);
    }

    /**
     * This function is to set errors in formik forms
     *
     * @param {T} fromErrors - Object with error of forms
     * @return {void} This function does not return anything
     */
    const setErrorForm = <T extends Object>(fromErrors: T): void => {
        const values = Object.values(fromErrors) as string[];
        setStatus({ msg: values[0], code: 400 });
    }

    /**
     * Sets the network error status and dispatches an action if provided.
     *
     * @param {string} msg - An optional error message.
     * @param {function} onDispatch - An optional function to be called on dispatch.
     * @return {void} This function does not return anything
     */
    const setNetworkError = (msg?: string, onDispatch?: () => void): void => {
        onDispatch && onDispatch();
        setStatus({ code: 500, msg: msg || networkMessages.WIFI_HASNT_CONNEC_EXPLAIN });
    }

    /**
     * Sets an unauthenticated error and optionally triggers a dispatch function.
     *
     * @param {() => void} onDispatch - An optional function to be triggered.
     * @return {void} This function does not return anything
     */
    const setUnauthenticatedError = (onDispatch?: () => void): void => {
        onDispatch && onDispatch();
        setStatus({ code: 401, msg: authMessages.UNAUTHENTICATED });
    }

    return {
        state,

        clearStatus,
        setError,
        setErrorForm,
        setNetworkError,
        setStatus,
        setUnauthenticatedError,
    }
}

export default useStatus;