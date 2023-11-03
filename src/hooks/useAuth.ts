import { AuthResponse } from '@supabase/supabase-js';
import { OneSignal } from 'react-native-onesignal';

/* Env */
import { SITIE_URL } from '@env';

/* Supabase - config */
import { supabase } from '../supabase/config';

/* Features */
import { useAppDispatch, useAppSelector } from '../features';
import {
    setUser as setUserAction,
    clearAuth as clearAuthAction,
    setIsAuthLoading,
    updateUser
} from '../features/auth';
import { clearCourses } from '../features/courses';
import { clearPreaching } from '../features/preaching';
import { clearRevisits } from '../features/revisits';

/* Adapters */
import { userAdpater } from '../adapters';

/* Hooks */
import { useNetwork, useStatus } from './';

/* Interfaces */
import { SignIn, Profile, SignUp, UserEndpoint } from '../interfaces/auth';

/**
 * Hook to management authentication of store with state and actions
 */
const useAuth = () => {
    const dispatch = useAppDispatch();

    const { setStatus, setSupabaseError, setNetworkError } = useStatus();
    const { isConnected } = useNetwork();

    const state = useAppSelector(store => store.auth);

    const clearAuth = () => dispatch(clearAuthAction());

    /**
     * If the response is an error, set the error and return, otherwise
     * set the user.
     * @param {AuthResponse} AuthResponse - this is the response from the API call.
     * @param {boolean} isNew - this is a flag indicating whether the user is a new user or not.
     *
     * @return {void} This function does not return any value.
     */
    const setUser = ({ data: { user, session }, error }: AuthResponse, isNew: boolean = false): void => {
        const next = setSupabaseError(error, 400, () => {
            dispatch(clearAuthAction());
            OneSignal.logout();
        });

        if (next) return;

        dispatch(setUserAction({
            token: session?.refresh_token!,
            user: userAdpater({
                ...user?.user_metadata,
                id: user?.id!,
                createdAt: user?.created_at!,
                updatedAt: user?.updated_at!,
                email: user?.email,
            } as UserEndpoint)
        }));

        if (isNew) {
            let msg = `Hemos enviado un correo de confirmación a ${ user!.email }. `
            msg += 'Por favor, revíselo y siga los pasos que se le indiquen.';

            setStatus({ code: 200, msg });
        }
    }

    /**
     * `renew` is an async function that checks if the token is empty, if it is, it returns. If it's
     * not empty, it calls `supabase.auth.refreshSession` with the token as a parameter
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const renew = async (): Promise<void> => {
        if (state.token?.trim().length <= 0) return;

        if (!isConnected) {
            setNetworkError();
            return;
        }

        const result = await supabase.auth.refreshSession({ refresh_token: state.token });
        setUser(result);
    }

    /**
     * If the user enters a valid email address, we send them an email with a link to reset their
     * password.
     *
     * We pass the error object to the setSupabaseError function. This function will check the error
     * code and display an error message to the user if
     * @param {{ email: string }} { email: string } - This a object with email property
     * to reset password for authenticated user
     * @return {Promise<void>} This function does not return any value.
     */
    const resetPassword = async ({ email }: { email: string }): Promise<void> => {
        if (!isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));
        SITIE_URL;

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${ SITIE_URL }/reset-password`
        });

        const next = setSupabaseError(error, 400, () => dispatch(setIsAuthLoading({ isLoading: false })));
        if (next) return;

        let msg = `Hemos enviado un correo de restablecimiento de contraseña a ${ email }. `;
        msg += 'Por favor revísalo y sigue los pasos para recuperar tu cuenta.';

        dispatch(setIsAuthLoading({ isLoading: false }));
        setStatus({ code: 200, msg });
    }

    /**
     * The function signIn takes an object with the properties email and password, and returns a promise
     * that resolves to an object with the properties email, id, and token.
     *
     * @param {SignIn} { email: string, password: string } - This is a values for sign in a user
     * @return {Promise<void>} This function does not return any value.
     */
    const signIn = async ({ email, password }: SignIn): Promise<void> => {
        if (!isConnected) {
            setNetworkError('Lo sentimos pero no dispones de conexión a Internet.');
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));

        const result = await supabase.auth.signInWithPassword({ email, password });
        setUser(result);
    }

    /**
     * If the user is not authenticated, return. If the user is authenticated, sign them out and clear
     * the redux store.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const signOut = async (): Promise<void> => {
        if (!state.isAuthenticated) return;

        if (isConnected) {
            const { error } = await supabase.auth.signOut();
            OneSignal.logout();
            const next = setSupabaseError(error, 500);
            if (next) return;
        }

        dispatch(clearCourses());
        dispatch(clearPreaching());
        dispatch(clearRevisits());
        dispatch(clearAuthAction());
    }

    /**
     * This function is to register a new user and authenticate it.
     *
     * @param {SignUp} { name: string, surname: string, email: string, password: string } - This is a
     * values for sign up a new user
     * @return {Promise<void>} This function does not return any value.
     */
    const signUp = async ({ name, surname, email, password }: SignUp): Promise<void> => {
        if (!isConnected) {
            setNetworkError('Lo sentimos pero no dispones de conexión a Internet.');
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));

        const result = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    surname,
                    precursor: 'ninguno',
                    hours_requirement: 0
                }
            }
        });

        if (result?.data?.user?.identities?.length === 0) {
            dispatch(setIsAuthLoading({ isLoading: false }));

            setStatus({
                code: 400,
                msg: 'Lo sentimos, pero este correo ya está registrado.'
            });

            return;
        }

        setUser(result, true);
    }

    /**
     * If the user's email is the same as the email passed in, then set the status to 400 and return,
     * otherwise, update the user's email and set the status to 200.
     *
     * @param {{ email: string }} { email: string } - This a object with email property to
     * update email for authenticated user
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return any value.
     */
    const updateEmail = async ({ email }: { email: string }, onFinish?: () => void): Promise<void> => {
        if (!isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));

        if (email.trim().length === 0) {
            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'El correo no puede estar vacío.'
            });

            return;
        }

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

    /**
     * If the password is empty, set the status to 400 and return, otherwise, if there's an error, set
     * the status to 400 and return, otherwise, set the status to 200 and return.
     *
     * @param {{ password: string }} { password: string } - This is a object with password property
     * for update password
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const updatePassword = async ({ password }: { password: string }, onFinish?: () => void): Promise<void> => {
        if (!isConnected) {
            setNetworkError();
            return;
        }

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

    /**
     * If the user updates their profile, then update the user's profile.
     *
     * @param {Profile} values - This is a values for update profile
     * @return {Promise<void>} This function does not return anything.
     */
    const updateProfile = async (values: Profile): Promise<void> => {
        if (!isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));

        const { hoursRequirement, ...rest } = values;

        const { error } = await supabase.auth.updateUser({ data: { ...rest, hours_requirement: hoursRequirement } });

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
        renew,
        resetPassword,
        signIn,
        signOut,
        signUp,
        updateEmail,
        updatePassword,
        updateProfile
    }
}

export default useAuth;
