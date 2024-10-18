/* Errors */
import { AppErrors, DtoError, EmailError, ImageError, RequestError } from '@domain/errors';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import { clearStatus as clearStatusAction, setStatus as setStatusAction, SetStatusPayload } from '@application/features';

/* Services */
import { LoggerService } from '@services';

/* Utils */
import { authMessages } from '@auth';
import { networkMessages } from '../utils';

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
        console.error({ ...(error as Error), message: (error as Error).message });
        let msg = 'Ocurrio un error inesperado al realizar la acción';
        let status = 400;

        if (error instanceof RequestError) {
            msg = AppErrors.translateMsg(error.code);
            status = error.status;
        }

        if (error instanceof ImageError) msg = AppErrors.translateMsg(error.message);
        if (error instanceof EmailError) msg = error.message;
        if (error instanceof DtoError) msg = error.message;

        setStatus({ msg, code: status });
        LoggerService.error({ ...(error as Error), message: (error as Error).message });
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
        setStatus({ code: 500, msg: msg || networkMessages.WIFI_HASNT_CONNECTION });
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
        clearStatus,
        setErrorForm,
        setError,
        setNetworkError,
        setStatus,
        setUnauthenticatedError,
        state,
    }
}

export default useStatus;