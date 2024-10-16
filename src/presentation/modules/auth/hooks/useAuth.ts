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
import { SignUpDto, UpdateEmailDto, UpdateProfileDto } from '@domain/dtos';

/* Entities */
import { UserEntity } from '@domain/entities';

/* Errors */
import { DtoError, RequestError } from '@domain/errors';

/* Hooks */
import { useNetwork, useStatus } from '@shared';

/* Interfaces */
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

    const { setStatus, setError, setUnauthenticatedError } = useStatus();
    const { hasWifiConnection, wifi } = useNetwork();

    const state = useAppSelector(store => store.auth);

    const clearAuth = () => dispatch(clearAuthAction());
    const setUser = (token: string, user: UserEntity) => dispatch(setUserAction({ token, user }));
    const setIsAuthLoading = (isLoading: boolean) => dispatch(setIsAuthLoadingAction({ isLoading }));

    const handleFailAuth = (): void => {
        dispatch(clearCourses());
        dispatch(clearLessons());
        dispatch(clearPreaching());
        dispatch(clearRevisits());
        dispatch(clearAuthAction());
        NotificationsService.close();
    }

    const isAuthenticated = (onError?: () => void): boolean => {
        const value = state.isAuthenticated;
        if (!value) setUnauthenticatedError(onError);

        return value;
    }

    /**
     * Gets the user authentication and sets the user in the reducer.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const getAuth = async (): Promise<void> => {
        if (!state.token) return;

        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        try {
            const { token, user } = await AuthService.getSession(state.token);
            setUser(token, user);
        }
        catch (error) {
            setError(error);
            handleFailAuth();
        }
    }

    /**
     * Resets the password for a user with the given email.
     *
     * @param {EmailData} email - The email of the user whose password is being reset.
     * @return {Promise<void>} A promise that resolves when the password reset is complete.
     */
    const resetPassword = async ({ email }: EmailData): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        setIsAuthLoading(true);

        try {
            await AuthService.resetPassword(email);

            let msg = `Hemos enviado un correo de restablecimiento de contraseña a ${ email }. `;
            msg += 'Por favor revísalo y sigue los pasos para recuperar tu cuenta.';

            setIsAuthLoading(false);
            setStatus({ code: 200, msg });
        }
        catch (error) {
            setIsAuthLoading(false);
            setError(error);
        }
    }

    /**
     * Sign in a user with the provided email and password.
     *
     * @param {SignInData} email - The email of the user.
     * @param {SignInData} password - The password of the user.
     * @return {Promise<void>} A promise that resolves when the sign-in process is complete.
     */
    const signIn = async ({ email, password }: SignInData): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection('Lo sentimos pero no dispones de conexión a Internet.');
        if (!wifiConnectionAvailable) return;

        setIsAuthLoading(true);

        try {
            const { token, user } = await AuthService.signIn(email, password);
            setUser(token, user);
        }
        catch (error) {
            setError(error);
            handleFailAuth();
        }
        finally {
            setIsAuthLoading(false);
        }

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
            if (error) setError(error);
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
        const wifiConnectionAvailable = hasWifiConnection('Lo sentimos pero no dispones de conexión a Internet.');
        if (!wifiConnectionAvailable) return;

        setIsAuthLoading(true);

        try {
            const signUpDto = SignUpDto.create(data);
            const result = await AuthService.signUp(signUpDto);

            if (result.emailAlreadyExists) throw new RequestError(authMessages.EMAIL_ALREADY_REGISTERED, 400);
            await AuthService.signOut();

            onSuccess && onSuccess();

            let msg = `Hemos enviado un correo de confirmación a ${ data.email }. `
                msg += 'Por favor, revíselo y siga los pasos que se le indiquen.';

            setIsAuthLoading(false);
            setStatus({ code: 200, msg });
        }
        catch (error) {
            await AuthService.signOut();
            NotificationsService.close();
            clearAuth();
            setIsAuthLoading(false);

            setError(error);
        }
    }

    /**
     * Updates the user's email and handles the necessary validations and status updates.
     *
     * @param {EmailData} emailData - The object containing the email to be updated.
     * @param {() => void} [onFinish] - Optional callback function to be executed after the update is finished.
     * @return {Promise<void>} - A promise that resolves when the update is complete.
     */
    const updateEmail = async ({ email }: EmailData, onFinish?: () => void): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        setIsAuthLoading(true);

        const emailDto = UpdateEmailDto.create(email, state.user.email);

        if (emailDto instanceof DtoError) {
            setIsAuthLoading(false);
            onFinish && onFinish();
            setStatus({ code: 400, msg: emailDto.message });

            return;
        }

        try {
            await AuthService.updateEmail(emailDto);

            setIsAuthLoading(false);
            onFinish && onFinish();

            let msg = `Hemos mandado un correo de confirmación a ${ state.user.email }. `;
            msg += `Por favor revísalo. Una vez confirmes ese correo se enviará otro a ${ email }. `
            msg += 'Ese también confírmalo para efectuar el cambio.'

            setStatus({ code: 200, msg });
        }
        catch (error) {
            setIsAuthLoading(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * Updates the user's password if the Wi-Fi connection is available.
     *
     * @param {UpdatePasswordData} passwordData - The new password data.
     * @param {() => void} [onFinish] - Optional callback function to be executed after the update is finished.
     * @return {Promise<void>} A promise that resolves when the password update is complete.
     */
    const updatePassword = async ({ password }: UpdatePasswordData, onFinish?: () => void): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        setIsAuthLoading(true);

        if (password.trim().length === 0) {
            setIsAuthLoading(false);
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.PASSWORD_EMPTY });

            return;
        }

        try {
            await AuthService.updatePassword(password);

            setIsAuthLoading(false);
            onFinish && onFinish();
            setStatus({ code: 200, msg: authMessages.PASSWORD_UPDATED });
        }
        catch (error) {
            setIsAuthLoading(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * If the user updates their profile, then update the user's profile.
     *
     * @param {ProfileData} values - This is a values for update profile
     * @return {Promise<void>} This function does not return anything.
     */
    const updateProfile = async (values: ProfileData): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        setIsAuthLoading(true);

        try {
            const updateDto = UpdateProfileDto.create(values);
            const user = await AuthService.updateProfile(updateDto);

            dispatch(updateUser({ user: { ...state.user, ...user } }));
            setStatus({ code: 200, msg: authMessages.PROFILE_UPDATED });
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsAuthLoading(false);
        }
    }

    return {
        state,

        // Actions
        clearAuth,

        // Functions
        getAuth,
        isAuthenticated,
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
