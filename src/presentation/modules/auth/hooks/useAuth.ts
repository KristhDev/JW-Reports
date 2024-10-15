import { AuthResponse } from '@supabase/supabase-js';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    clearAuth as clearAuthAction,
    setIsAuthLoading as setIsAuthLoadingAction,
    setUser as setUserAction,
    updateUser,
    clearCourses,
    clearLessons,
    clearPreaching,
    clearRevisits
} from '@application/features';

/* DTOs */
import { SignUpDto, UpdateProfileDto } from '@domain/dtos';

/* Entities */
import { UserEntity } from '@domain/entities';

/* Hooks */
import { useNetwork, useStatus } from '@shared';

/* Interfaces */
import { UserEndpoint } from '@infrasturcture/interfaces';
import { SignInData, ProfileData, SignUpData, EmailData, UpdatePasswordData } from '../interfaces';

/* Services */
import { AuthService } from '../services';
import { NotificationsService } from '@services';

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
    const setIsAuthLoading = (isLoading: boolean) => dispatch(setIsAuthLoadingAction({ isLoading }));

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
            NotificationsService.close();
        });

        if (next) return;

        dispatch(setUserAction({
            token: session?.access_token!,
            user: UserEntity.fromEndpoint({
                ...user?.user_metadata,
                id: user?.id!,
                createdAt: user?.created_at!,
                updatedAt: user?.updated_at!,
                email: user?.email!,
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

        const result = await AuthService.getSession(state.token);
        setUser(result);
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

        setIsAuthLoading(true);

        const { error } = await AuthService.resetPassword(email);

        const next = setSupabaseError(error, 400, () => setIsAuthLoading(false));
        if (next) return;

        let msg = `Hemos enviado un correo de restablecimiento de contraseña a ${ email }. `;
        msg += 'Por favor revísalo y sigue los pasos para recuperar tu cuenta.';

        setIsAuthLoading(false);
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

        setIsAuthLoading(true);

        const result = await AuthService.signIn(email, password);
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
            const { error } = await AuthService.signOut();
            NotificationsService.close();
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
    const signUp = async (data: SignUpData, onSuccess?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError('Lo sentimos pero no dispones de conexión a Internet.');
            return;
        }

        setIsAuthLoading(true);

        const signUpDto = SignUpDto.create(data);
        const result = await AuthService.signUp(signUpDto);

        if (result.emailAlreadyExists) {
            setIsAuthLoading(false);
            setStatus({ code: 400, msg: authMessages.EMAIL_ALREADY_REGISTERED });

            await AuthService.signOut();
            return;
        }

        const next = setSupabaseError(result.error, 400, () => {
            clearAuth();
            NotificationsService.close();
        });

        if (next) return;

        const { error: errorSignOut } = await AuthService.signOut();

        const nextSignOut = setSupabaseError(errorSignOut, 400, () => setIsAuthLoading(false));
        if (nextSignOut) return;

        onSuccess && onSuccess();

        let msg = `Hemos enviado un correo de confirmación a ${ data.email }. `
            msg += 'Por favor, revíselo y siga los pasos que se le indiquen.';

        setIsAuthLoading(false);
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

        setIsAuthLoading(true);

        if (email.trim().length === 0) {
            setIsAuthLoading(false);
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.EMAIL_EMPTY });

            return;
        }

        if (state.user.email === email) {
            setIsAuthLoading(false);
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.EMAIL_UPDATE_UNCHANGED });

            return;
        }

        const { error } = await AuthService.updateEmail(email);

        const next = setSupabaseError(error, 400, () => {
            setIsAuthLoading(false);
            onFinish && onFinish();
        });

        if (next) return;

        setIsAuthLoading(false);
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

        setIsAuthLoading(true);

        if (password.trim().length === 0) {
            setIsAuthLoading(false);
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.PASSWORD_EMPTY });

            return;
        }

        const { error } = await AuthService.updatePassword(password);

        const next = setSupabaseError(error, 400, () => {
            setIsAuthLoading(false);
            onFinish && onFinish();
        });

        if (next) return;

        setIsAuthLoading(false);
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

        setIsAuthLoading(true);

        const updateDto = UpdateProfileDto.create(values);
        const { error } = await AuthService.updateProfile(updateDto);

        const next = setSupabaseError(error, 400, () => setIsAuthLoading(false));
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
