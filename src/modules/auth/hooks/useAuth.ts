import { AuthResponse } from '@supabase/supabase-js';

/* Env */
import { SITIE_URL } from '@env';

/* Supabase */
import { supabase } from '@config';

/* Adapters */
import { userAdpater } from '../adapters';

/* Features */
import { clearAuth as clearAuthAction, setIsAuthLoading, setUser as setUserAction, updateUser } from '../features';
import { useAppDispatch, useAppSelector } from '@features';
import { clearCourses } from '@courses';
import { clearLessons } from '@lessons';
import { clearPreaching } from '@preaching';
import { clearRevisits } from '@revisits';

/* Hooks */
import { useNetwork, useStatus } from '@shared';

/* Interfaces */
import { SignInData, ProfileData, SignUpData, UserEndpoint, EmailData, UpdatePasswordData } from '../interfaces';

/* Services */
import { notifications } from '@services';

/* Utils */
import { authMessages } from '../utils';

/**
 * Hook to management authentication of store with state and actions
 */
const useAuth = () => {
    const dispatch = useAppDispatch();

    const { setStatus, setSupabaseError, setNetworkError } = useStatus();
    const { wifi } = useNetwork();

    const state = useAppSelector(store => store.auth);

    const clearAuth = () => dispatch(clearAuthAction());

    /**
     * If the response is an error, set the error and return, otherwise
     * set the user.
     * @param {AuthResponse} AuthResponse - this is the response from the API call.
     *
     * @return {void} This function does not return any value.
     */
    const setUser = ({ data: { user, session }, error }: AuthResponse): void => {
        const next = setSupabaseError(error, 400, () => {
            dispatch(clearCourses());
            dispatch(clearLessons());
            dispatch(clearPreaching());
            dispatch(clearRevisits());
            dispatch(clearAuthAction());
            notifications.close();
        });

        if (next) return;

        dispatch(setUserAction({
            token: session?.access_token!,
            user: userAdpater({
                ...user?.user_metadata,
                id: user?.id!,
                createdAt: user?.created_at!,
                updatedAt: user?.updated_at!,
                email: user?.email,
            } as UserEndpoint)
        }));
    }

    /**
     * Gets the user authentication and sets the user in the reducer.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const getAuth = async (): Promise<void> => {
        if (!state.token) return;

        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        const user = await supabase.auth.getUser(state.token);
        const session = await supabase.auth.getSession();

        const response: AuthResponse = {
            data: {
                session: session.data?.session,
                user: user.data?.user
            },
            error: user?.error || session?.error
        } as AuthResponse;

        setUser(response);
    }

    /**
     * Resets the password for a user with the given email.
     *
     * @param {EmailData} email - The email of the user whose password is being reset.
     * @return {Promise<void>} A promise that resolves when the password reset is complete.
     */
    const resetPassword = async ({ email }: EmailData): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));

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
     * Sign in a user with the provided email and password.
     *
     * @param {SignInData} email - The email of the user.
     * @param {SignInData} password - The password of the user.
     * @return {Promise<void>} A promise that resolves when the sign-in process is complete.
     */
    const signIn = async ({ email, password }: SignInData): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError('Lo sentimos pero no dispones de conexión a Internet.');
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));

        const result = await supabase.auth.signInWithPassword({ email, password });
        setUser(result);
    }

    /**
     * Signs out the user if they are authenticated and connected to WiFi. If not connected to WiFi,
     * the user is still signed out. Clears the redux store of all user data.
     *
     * @return {Promise<void>} This function does not return anything.
     */
    const signOut = async (): Promise<void> => {
        if (!state.isAuthenticated) return;

        if (wifi.hasConnection) {
            const { error } = await supabase.auth.signOut();
            notifications.close();
            setSupabaseError(error, 500);
        }

        dispatch(clearCourses());
        dispatch(clearLessons());
        dispatch(clearPreaching());
        dispatch(clearRevisits());
        dispatch(clearAuthAction());
    }

    /**
     * Signs up a user with the provided name, surname, email, and password.
     *
     * @param {SignUpData} name - The name of the user.
     * @param {SignUpData} surname - The surname of the user.
     * @param {SignUpData} email - The email of the user.
     * @param {SignUpData} password - The password of the user.
     * @param {() => void} onSuccess - A function to be called when the sign-up process is successful.
     * @return {Promise<void>} A promise that resolves when the sign-up process is complete.
     */
    const signUp = async ({ name, surname, email, password }: SignUpData, onSuccess?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
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
                    hours_requirement: 0,
                    hours_ldc: false
                }
            }
        });

        if (result?.data?.user?.identities?.length === 0) {
            dispatch(setIsAuthLoading({ isLoading: false }));
            setStatus({ code: 400, msg: authMessages.EMAIL_ALREADY_REGISTERED });

            await supabase.auth.signOut();

            return;
        }

        const next = setSupabaseError(result.error, 400, () => {
            dispatch(clearAuthAction());
            notifications.close();
        });

        if (next) return;

        const { error: errorSignOut } = await supabase.auth.signOut();

        const nextSignOut = setSupabaseError(errorSignOut, 400, () => {
            dispatch(setIsAuthLoading({ isLoading: false }));
        });

        if (nextSignOut) return;
        onSuccess && onSuccess();

        let msg = `Hemos enviado un correo de confirmación a ${email }. `
            msg += 'Por favor, revíselo y siga los pasos que se le indiquen.';

        dispatch(setIsAuthLoading({ isLoading: false }));
        setStatus({ code: 200, msg });
    }

    /**
     * Updates the user's email and handles the necessary validations and status updates.
     *
     * @param {EmailData} emailData - The object containing the email to be updated.
     * @param {() => void} [onFinish] - Optional callback function to be executed after the update is finished.
     * @return {Promise<void>} - A promise that resolves when the update is complete.
     */
    const updateEmail = async ({ email }: EmailData, onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));

        if (email.trim().length === 0) {
            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.EMAIL_EMPTY });

            return;
        }

        if (state.user.email === email) {
            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.EMAIL_UPDATE_UNCHANGED });

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
     * Updates the user's password if the Wi-Fi connection is available.
     *
     * @param {UpdatePasswordData} passwordData - The new password data.
     * @param {() => void} [onFinish] - Optional callback function to be executed after the update is finished.
     * @return {Promise<void>} A promise that resolves when the password update is complete.
     */
    const updatePassword = async ({ password }: UpdatePasswordData, onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));

        if (password.trim().length === 0) {
            dispatch(setIsAuthLoading({ isLoading: false }));
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.PASSWORD_EMPTY });

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
        setStatus({ code: 200, msg: authMessages.PASSWORD_UPDATED });
    }

    /**
     * If the user updates their profile, then update the user's profile.
     *
     * @param {ProfileData} values - This is a values for update profile
     * @return {Promise<void>} This function does not return anything.
     */
    const updateProfile = async (values: ProfileData): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        dispatch(setIsAuthLoading({ isLoading: true }));

        const { hoursRequirement, hoursLDC, ...rest } = values;

        const { error } = await supabase.auth.updateUser({
            data: {
                ...rest,
                hours_requirement: hoursRequirement,
                hours_ldc: hoursLDC
            }
        });

        const next = setSupabaseError(error, 400, () => dispatch(setIsAuthLoading({ isLoading: false })));
        if (next) return;

        dispatch(updateUser({ user: { ...state.user, ...values } }));
        setStatus({ code: 200, msg: authMessages.PROFILE_UPDATED });
    }

    return {
        state,

        // Actions
        clearAuth,

        // Functions
        getAuth,
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
