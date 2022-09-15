import { useSelector } from 'react-redux';

import { RootState } from '../features/store';

// import { setUser as setUserAction } from '../features/auth';

import { AuthState } from '../interfaces/auth';

const useAuth = () => {
    // const dispatch = useAppDispatch();
    const state = useSelector<RootState, AuthState>(store => store.auth);

    return {
        state,
    }
}

export default useAuth;