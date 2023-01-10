import { useSelector } from 'react-redux';
import { AuthResponse } from '@supabase/supabase-js';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    setUser as setUserAction,
    clearAuth as clearAuthAction,
    setIsAuthLoading
} from '../features/auth';
import { clearPreaching } from '../features/preaching';
import { clearRevisits } from '../features/revisits';

import { useStatus } from './';

import { AuthState, Register, User } from '../interfaces/auth';

const useAuth = () => {
    const dispatch = useAppDispatch();

    const { setStatus } = useStatus();

    const state = useSelector<RootState, AuthState>(store => store.auth);

    const setUser = ({ data: { user, session }, error }: AuthResponse) => {
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
                id: user?.id!,
                createdAt: user?.created_at!,
                updatedAt: user?.updated_at!,
                email: user?.email,
            } as User
        }));
    }

    const register = async ({ name, surname, email, password }: Register) => {
        dispatch(setIsAuthLoading({ isLoading: true }));

        const result = await supabase.auth.signUp({ email, password });

        if (result?.data?.user !== null) {
            result.data.user.user_metadata = {
                ...result.data.user!.user_metadata,
                name,
                surname
            }

            await supabase.auth.updateUser({ data: { name, surname } });
        }

        setUser(result);
    }

    const login = async ({ email, password }: { email: string, password: string }) => {
        dispatch(setIsAuthLoading({ isLoading: true }));

        const result = await supabase.auth.signInWithPassword({ email, password });
        setUser(result);
    }

    const renew = async () => {
        if (state.token?.trim().length <= 0) return;
        const result = await supabase.auth.refreshSession({ refresh_token: state.token });
        setUser(result);
    }

    const logout = async () => {
        if (!state.isAuthenticated) return;
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error);
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(clearPreaching());
        dispatch(clearRevisits());
        dispatch(clearAuthAction());
    }

    return {
        state,

        // Functions
        login,
        logout,
        register,
        renew
    }
}

export default useAuth;