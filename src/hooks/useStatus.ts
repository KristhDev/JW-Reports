import { AuthError, PostgrestError } from '@supabase/supabase-js';

/* Features */
import { useAppDispatch, useAppSelector } from '../features';
import { clearStatus as clearStatusAction, setStatus as setStatusAction } from '../features/status';

/* Interfaces */
import { SetStatusPayload } from '../interfaces/status';
import { StorageError } from '../interfaces/ui';

/* Utils */
import { translateErrorMsg } from '../utils';

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
     * @param {T} fromErrors - Object with error of forms
     */
    const setErrorForm = <T extends Object>(fromErrors: T) => {
        const values = Object.values(fromErrors) as string[];

        setStatus({
            msg: values[0],
            code: 400
        });
    }

    /**
     * If there's an error, log it, call the onDispatch function if it exists, set the status, and
     * return true. Otherwise, return false.
     * @param {AuthError | PostgrestError | StorageError |  null} error - AuthError | PostgrestError |
     * StorageError |  null
     * @param {number} status - number - The status code of the error
     * @param {Function} onDispatch - This is a function that will be called if there is an error.
     * @returns A boolean value.
     */
    const setSupabaseError = (error: AuthError | PostgrestError | StorageError |  null, status: number, onDispatch?: () => void) => {
        if (error) {
            console.log(error);
            const msg = translateErrorMsg(error.message);

            onDispatch && onDispatch();
            setStatus({ code: status, msg });

            return true;
        }

        return false;
    }

    const setUnauthenticatedError = (onDispatch?: () => void) => {
        onDispatch && onDispatch();

        setStatus({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    }

    const setNetworkError = (msg?: string, onDispatch?: () => void) => {
        onDispatch && onDispatch();

        setStatus({
            code: 500,
            msg: msg || 'Lo sentimos pero no dispones de conexion a Internet. Los datos que hay en la aplicación no son actualizados. Hasta que recuperes la conexión no podras obtener, guardar, editar o eliminar ningún dato.',
        });
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