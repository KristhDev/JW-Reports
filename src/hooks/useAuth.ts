import { useSelector } from 'react-redux';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import { setUser as setUserAction, clearAuth as clearAuthAction } from '../features/auth';

import { useStatus } from './';

import { AuthState, Register, User } from '../interfaces/auth';

const useAuth = () => {
    const dispatch = useAppDispatch();
    const { setStatus } = useStatus();

    const state = useSelector<RootState, AuthState>(store => store.auth);

    const register = async ({ name, surname, email, password }: Register) => {
        const credentails = { email, password }
        const userData = { name, surname, createdAt: new Date(), updatedAt: new Date() }

        const { data: { session, user }, error } = await supabase.auth.signUp(credentails);
        await supabase.auth.updateUser({ data: userData });

        if (error) {
            console.log(error);
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(setUserAction({
            token: session?.refresh_token!,
            user: {
                ...userData,
                id: user?.id!,
                email,
            }
        }));
    }

    const login = async ({ email, password }: { email: string, password: string }) => {
        const { data: { session, user }, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.log(error);
            setStatus({ code: 400, msg: error.message });

            return;
        }

        console.log(user);

        dispatch(setUserAction({
            token: session?.refresh_token!,
            user: {
                ...user?.user_metadata,
                id: user?.id!,
                email,
            } as User
        }));
    }

    const renew = async () => {
        if (state.token?.trim().length <= 0) return;
        const { data: { user, session }, error } = await supabase.auth.refreshSession({ refresh_token: state.token });

        if (error) {
            console.log(error);
            dispatch(clearAuthAction());
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(setUserAction({
            token: session?.refresh_token!,
            user: {
                ...user?.user_metadata,
                id: user?.id!
            } as User
        }));
    }

    const logout = async () => {
        if (!state.isAuthenticated) return;
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error);
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(clearAuthAction());
    }

    return {
        state,
        register,
        login,
        logout,
        renew
    }
}

export default useAuth;