import { useSelector } from 'react-redux';
import { AuthError, PostgrestError } from '@supabase/supabase-js';

import { RootState, useAppDispatch } from '../features/store';

import { clearStatus as clearStatusAction, setStatus as setStatusAction } from '../features/status';

import { SetStatusPayload, StatusState } from '../interfaces/status';

interface StorageError {
    message: string;
    name: string;
    stack?: string;
}

const useStatus = () => {
    const dispatch = useAppDispatch();
    const state = useSelector<RootState, StatusState>(store => store.status);

    const setStatus = (status: SetStatusPayload) => dispatch(setStatusAction(status));
    const clearStatus = () => dispatch(clearStatusAction());

    const setErrorForm = <T extends Object>(fromErrors: T) => {
        const values = Object.values(fromErrors) as string[];

        setStatus({
            msg: values[0],
            code: 400
        });
    }

    const setSupabaseError = (error: AuthError | PostgrestError | StorageError |  null, onDispatch?: () => void) => {
        if (error) {
            console.log(error);

            onDispatch && onDispatch();
            setStatus({ code: 400, msg: error.message });

            return true;
        }

        return false;
    }


    return {
        state,
        clearStatus,
        setSupabaseError,
        setErrorForm,
        setStatus
    }
}

export default useStatus;