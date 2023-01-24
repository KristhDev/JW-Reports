import { useSelector } from 'react-redux';
import { AuthResponse } from '@supabase/supabase-js';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    setUser as setUserAction,
    clearAuth as clearAuthAction,
    setIsAuthLoading,
    updateUser
} from '../features/auth';
import { clearPreaching } from '../features/preaching';
import { clearRevisits } from '../features/revisits';

import { useStatus } from './';

import { AuthState, Login, Profile, Register, User } from '../interfaces/auth';

const useAuth = () => {
    const dispatch = useAppDispatch();

    const { setStatus } = useStatus();

    const state = useSelector<RootState, AuthState>(store => store.auth);

    const clearAuth = () => dispatch(clearAuthAction());

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
                surname,
                precursor: 'ninguno'
            }

            await supabase.auth.updateUser({ data: { name, surname, precursor: 'ninguno' } });
        }

        setUser(result);
    }

    const login = async ({ email, password }: Login) => {
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

    const updateProfile = async (values: Profile) => {
        dispatch(setIsAuthLoading({ isLoading: true }));

        const { error } = await supabase.auth.updateUser({ data: { ...values } });

        if (error) {
            console.log(error);
            dispatch(setIsAuthLoading({ isLoading: false }));
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(updateUser({
            user: { ...state.user, ...values }
        }));

        setStatus({
            code: 200,
            msg: 'Haz actualizado tu perfil correctamente'
        });
    }

    const updateEmail = async ({ email }: { email: string }, onFinish?: () => void) => {
        dispatch(setIsAuthLoading({ isLoading: true }));

        if (state.user.email === email) {
            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'Para actualizar tu correo debes cambiarlo.'
            });

            return;
        }

        const { error } = await supabase.auth.updateUser({ email });

        if (error) {
            console.log(error);

            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(setIsAuthLoading({ isLoading: false }));
        onFinish && onFinish();

        let msg = `Hemos mandado un correo de confirmación a ${ state.user.email }. `;
        msg += `Por favor revisalo. Una vez confirmes ese correo se enviara otro a ${ email }. `
        msg += 'Ese también confirmalo para efectuar el cambio.'

        setStatus({ code: 200, msg });
    }

    const updatePassword = async ({ password }: { password: string }, onFinish?: () => void) => {
        dispatch(setIsAuthLoading({ isLoading: true }));

        if (password.trim().length === 0) {
            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'La contraseña no puede estar vacia.'
            });

            return;
        }

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            console.log(error);

            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(setIsAuthLoading({ isLoading: false }));
        onFinish && onFinish();

        setStatus({
            code: 200,
            msg: 'Haz actualizado tu contraseña correctamente'
        });
    }

    return {
        state,

        // Actions
        clearAuth,

        // Functions
        login,
        logout,
        register,
        renew,
        updateEmail,
        updatePassword,
        updateProfile
    }
}

export default useAuth;