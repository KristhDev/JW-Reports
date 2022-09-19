import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../features/store';

import { clearStatus as clearStatusAction, setStatus as setStatusAction } from '../features/status';

import { SetStatusPayload, StatusState } from '../interfaces/status';

const useTheme = () => {
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


    return {
        state,
        clearStatus,
        setErrorForm,
        setStatus
    }
}

export default useTheme;