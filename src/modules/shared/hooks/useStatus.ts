import { AuthError, PostgrestError } from '@supabase/supabase-js';

/* Features */
import { useAppDispatch, useAppSelector } from '@features';
import { clearStatus as clearStatusAction, setStatus as setStatusAction,  } from '../features';

/* Interfaces */
import { SetStatusPayload } from '../interfaces';
import { StorageError } from '@ui';

/* Services */
import { logger } from '@services';

/* Utils */
import { authMessages } from '@auth';
import { AppErrors } from '@utils';
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
     * If there's an error, log it, call the onDispatch function if it exists, set the status, and
     * return true. Otherwise, return false
     *
     * @param {AuthError | PostgrestError | StorageError | null } error - AuthError | PostgrestError |
     * StorageError |  null
     * @param {number} status - number - The status code of the error
     * @param {Function} onDispatch - This is a function that will be called if there is an error.
     * @return {boolean} Returns true if there's an error, false otherwise
     */
    const setSupabaseError = (error: AuthError | PostgrestError | StorageError | null, status: number, onDispatch?: () => void): boolean => {
        if (error) {
            const msg = AppErrors.translateMsg(error.message);

            onDispatch && onDispatch();
            setStatus({ code: status, msg });
            logger.error({ ...error, message: error.message });

            return true;
        }

        return false;
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
        setErrorForm,
        setNetworkError,
        setStatus,
        setSupabaseError,
        setUnauthenticatedError,
    }
}

export default useStatus;