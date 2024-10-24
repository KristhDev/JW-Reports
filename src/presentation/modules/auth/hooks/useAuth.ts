/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    clearAuth as clearAuthAction,
    setIsAuthLoading as setIsAuthLoadingAction,
    setUser as setUserAction,
    updateUser as updateUserAction,
    clearCourses as clearCoursesAction,
    clearLessons as clearLessonsAction,
    clearPreaching as clearPreachingAction,
    clearRevisits as clearRevisitsAction
} from '@application/features';

/* DTOs */
import { SignUpDto, UpdateEmailDto, UpdatePasswordDto, UpdateProfileDto } from '@domain/dtos';

/* Entities */
import { UserEntity } from '@domain/entities';

/* Hooks */
import { networkMessages, useNetwork, useStatus } from '@shared';

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
    const updateUser = (user: UserEntity) => dispatch(updateUserAction({ user }));
    const clearCourses = () => dispatch(clearCoursesAction());
    const clearLessons = () => dispatch(clearLessonsAction());
    const clearPreaching = () => dispatch(clearPreachingAction());
    const clearRevisits = () => dispatch(clearRevisitsAction());

    /**
     * Function to handle authentication failure by clearing courses, lessons, preaching, revisits,
     * and authentication state, and closing notifications.
     *
     * @return {void} This function does not return anything.
     */
    const handleClearStore = (): void => {
        clearCourses();
        clearLessons();
        clearPreaching();
        clearRevisits();
        clearAuth();
        NotificationsService.close();
    }

    /**
     * Returns the state of the user authentication in the store.
     *
     * @param {(() => void) | undefined} onError Optional callback to call when user is not authenticated.
     * @return {boolean} The user authentication state.
     */
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
        if (state.token.trim().length === 0) return;

        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        try {
            const { token, user } = await AuthService.getSession(state.token);
            setUser(token, user);
        }
        catch (error) {
            setError(error);
            handleClearStore();
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
        const wifiConnectionAvailable = hasWifiConnection(networkMessages.WIFI_HASNT_CONNECTION);
        if (!wifiConnectionAvailable) return;

        setIsAuthLoading(true);

        try {
            const { token, user } = await AuthService.signIn(email, password);
            setUser(token, user);
        }
        catch (error) {
            setIsAuthLoading(false);
            setError(error);
            handleClearStore();
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

        try {
            if (wifi.hasConnection) await AuthService.signOut();
            handleClearStore();
        }
        catch (error) {
            setError(error);
        }
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
        const wifiConnectionAvailable = hasWifiConnection(networkMessages.WIFI_HASNT_CONNECTION);
        if (!wifiConnectionAvailable) return;

        setIsAuthLoading(true);

        try {
            const signUpDto = SignUpDto.create(data);
            const result = await AuthService.signUp(signUpDto);

            if (result.emailAlreadyExists) {
                setIsAuthLoading(false);
                setStatus({ code: 400, msg: authMessages.EMAIL_ALREADY_REGISTERED });
                await AuthService.signOut();

                return;
            }

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
            setIsAuthLoading(false);
            clearAuth();

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

        try {
            const updateEmailDto = UpdateEmailDto.create(email, state.user.email);
            await AuthService.updateEmail(updateEmailDto);

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

        try {
            const updatePasswordDto = UpdatePasswordDto.create(password);
            await AuthService.updatePassword(updatePasswordDto);

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

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsAuthLoading(true);

        try {
            const updateDto = UpdateProfileDto.create(values);
            const user = await AuthService.updateProfile(updateDto);

            updateUser({ ...state.user, ...user });
            setStatus({ code: 200, msg: authMessages.PROFILE_UPDATED });
        }
        catch (error) {
            setIsAuthLoading(false);
            setError(error);
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
