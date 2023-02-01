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
import { clearCourses } from '../features/courses';
import { clearPreaching } from '../features/preaching';
import { clearRevisits } from '../features/revisits';

import { useStatus } from './';

import { AuthState, Login, Profile, Register, User } from '../interfaces/auth';

const useAuth = () => {
    const dispatch = useAppDispatch();

    const { setStatus, setSupabaseError } = useStatus();

    const state = useSelector<RootState, AuthState>(store => store.auth);

    const clearAuth = () => dispatch(clearAuthAction());

    const setUser = ({ data: { user, session }, error }: AuthResponse) => {
        const next = setSupabaseError(error, 400, () => dispatch(clearAuthAction()));
        if (next) return;

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

    const login = async ({ email, password }: Login) => {
        dispatch(setIsAuthLoading({ isLoading: true }));

        const result = await supabase.auth.signInWithPassword({ email, password });
        setUser(result);
    }

    const logout = async () => {
        if (!state.isAuthenticated) return;
        const { error } = await supabase.auth.signOut();

        const next = setSupabaseError(error, 500);
        if (next) return;

        dispatch(clearCourses());
        dispatch(clearPreaching());
        dispatch(clearRevisits());
        dispatch(clearAuthAction());
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

    const renew = async () => {
        if (state.token?.trim().length <= 0) return;
        const result = await supabase.auth.refreshSession({ refresh_token: state.token });
        setUser(result);
    }

    const resetPassword = async ({ email }: { email: string }) => {
        dispatch(setIsAuthLoading({ isLoading: true }));

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:3000/reset-password'
        });

        const next = setSupabaseError(error, 400, () => dispatch(setIsAuthLoading({ isLoading: false })));
        if (next) return;

        let msg = `Hemos enviado un correo de restablecimiento de contraseña a ${ email }. `;
        msg += 'Por favor revísalo y sigue los pasos para recuperar tu cuenta.';

        dispatch(setIsAuthLoading({ isLoading: false }));
        setStatus({ code: 200, msg });
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

        const next = setSupabaseError(error, 400, () => {
            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        dispatch(setIsAuthLoading({ isLoading: false }));
        onFinish && onFinish();

        let msg = `Hemos mandado un correo de confirmación a ${ state.user.email }. `;
        msg += `Por favor revísalo. Una vez confirmes ese correo se enviará otro a ${ email }. `
        msg += 'Ese también confírmalo para efectuar el cambio.'

        setStatus({ code: 200, msg });
    }

    const updatePassword = async ({ password }: { password: string }, onFinish?: () => void) => {
        dispatch(setIsAuthLoading({ isLoading: true }));

        if (password.trim().length === 0) {
            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'La contraseña no puede estar vacía.'
            });

            return;
        }

        const { error } = await supabase.auth.updateUser({ password });

        const next = setSupabaseError(error, 400, () => {
            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        dispatch(setIsAuthLoading({ isLoading: false }));
        onFinish && onFinish();

        setStatus({
            code: 200,
            msg: 'Haz actualizado tu contraseña correctamente.'
        });
    }

    const updateProfile = async (values: Profile) => {
        dispatch(setIsAuthLoading({ isLoading: true }));

        const { error } = await supabase.auth.updateUser({ data: { ...values } });

        const next = setSupabaseError(error, 400, () => dispatch(setIsAuthLoading({ isLoading: false })));
        if (next) return;

        dispatch(updateUser({ user: { ...state.user, ...values } }));

        setStatus({
            code: 200,
            msg: 'Haz actualizado tu perfil correctamente.'
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
        resetPassword,
        updateEmail,
        updatePassword,
        updateProfile
    }
}

export default useAuth;