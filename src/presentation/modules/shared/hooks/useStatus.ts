/* Constants */
import { networkMessages, authMessages, appMessages } from '@application/constants';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import { clearStatus as clearStatusAction, setStatus as setStatusAction, SetStatusPayload } from '@application/features';

/* Errors */
import { AppErrors, CloudError, DtoError, EmailError, FileSystemError, ImageError, PDFError, RequestError, VoiceRecorderError } from '@domain/errors';

/* Services */
import { LoggerService } from '@domain/services';

/**
 * Hook to management status of store with state and actions
 */
const useStatus = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.status);

    const setStatus = (status: SetStatusPayload) => dispatch(setStatusAction(status));
    const clearStatus = () => dispatch(clearStatusAction());

    /**
     * This function is to set errors in status of store
     *
     * @param {unknown} error - The error to set
     * @return {void} This function does not return anything
     */
    const setError = (error: unknown): void => {
        let msg = appMessages.UNEXPECTED_ERROR;
        let status = 400;

        if (error instanceof RequestError) {
            msg = AppErrors.getMessageFromCode(error.code);
            status = error.status;
        }

        if (error instanceof CloudError) {
            msg = AppErrors.getMessageFromCode(error.message);
            status = error.status;
        }

        if (error instanceof DtoError) msg = error.message;
        if (error instanceof EmailError) msg = error.message;
        if (error instanceof FileSystemError) msg = error.message;
        if (error instanceof ImageError) msg = AppErrors.getMessageFromCode(error?.code || 'NO_CODE');
        if (error instanceof PDFError) msg = error.message;
        if (error instanceof VoiceRecorderError) msg = AppErrors.translateMessage(error.message);

        setStatus({ msg, code: status });

        const errorData = ('toJson' in (error as any) && typeof (error as any).toJson === 'function')
            ? (error as any).toJson()
            : { ...(error as Error), message: (error as Error).message }

        console.error(JSON.stringify(errorData, null, 2));
        LoggerService.error(errorData);
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
        setStatus({ code: 401, msg: authMessages.UNATHENTICATED });
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