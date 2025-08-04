/* Config */
import { authService, notificationsService, messagesService, toasterAdapter } from '@config/di';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    clearAuth as clearAuthAction,
    setIsAuthLoading as setIsAuthLoadingAction,
    setUser as setUserAction,
    updateUser as updateUserAction,
} from '@application/features/auth';

import { clearCourses as clearCoursesAction } from '@application/features/courses';
import { clearLessons as clearLessonsAction } from '@application/features/lessons';
import { clearPreaching as clearPreachingAction } from '@application/features/preaching';
import { clearRevisits as clearRevisitsAction } from '@application/features/revisits';

/* DTOs */
import { SignUpDto, UpdateEmailDto, UpdatePasswordDto, UpdateProfileDto } from '@domain/dtos';

/* Entities */
import { UserEntity } from '@domain/entities';

/* Hooks */
import { useNetwork } from '@shared/hooks';
import { useTranslation } from '@ui/hooks';

/* Interfaces */
import { SignInData, ProfileData, SignUpData, EmailData, UpdatePasswordData } from '../interfaces';

/**
 * Hook to management authentication of store with state and actions
 */
const useAuth = () => {
    const authMessages = messagesService.authMessages;
    const networkMessages = messagesService.networkMessages;

    const dispatch = useAppDispatch();

    const { hasWifiConnection, wifi } = useNetwork();
    const { translate } = useTranslation();

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
        notificationsService.close();
        clearAuth();
        clearCourses();
        clearLessons();
        clearPreaching();
        clearRevisits();
    }

    /**
     * Returns the state of the user authentication in the store.
     *
     * @param {(() => void) | undefined} onError Optional callback to call when user is not authenticated.
     * @return {boolean} The user authentication state.
     */
    const isAuthenticated = (onError?: () => void): boolean => {
        const value = state.isAuthenticated;
        if (!value) toasterAdapter.showUnauthenticatedError(onError);

        return value;
    }

    /**
     * Refreshes the user authentication and sets the user in the reducer.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const refreshAuth = async (): Promise<void> => {
        setIsAuthLoading(true);

        if (state.token.trim().length === 0) {
            setIsAuthLoading(false);
            return;
        }

        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) {
            setIsAuthLoading(false);
            return;
        }

        try {
            const { token, user } = await authService.refreshSession(state.token);
            setUser(token, user);
        }
        catch (error) {
            handleClearStore();
            toasterAdapter.showError(error);
        }
        finally {
            setIsAuthLoading(false);
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

        try {
            await authService.resetPassword(email);

            const message = translate('messages.auth.resetPassword', { email });
            toasterAdapter.showToast(message);
        }
        catch (error) {
            toasterAdapter.showError(error);
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

        try {
            const { token, user } = await authService.signIn(email, password);
            setUser(token, user);
        }
        catch (error) {
            toasterAdapter.showError(error);
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
            if (wifi.hasConnection) await authService.signOut();
            handleClearStore();
        }
        catch (error) {
            toasterAdapter.showError(error);
        }
    }

    /**
     * Signs up a user with the provided name, surname, email, and password.
     *
     * @param {SignUpData} name - The name of the user.
     * @param {SignUpData} surname - The surname of the user.
     * @param {SignUpData} email - The email of the user.
     * @param {SignUpData} password - The password of the user.
     * @return {Promise<void>} A promise that resolves when the sign-up process is complete.
     */
    const signUp = async (data: SignUpData): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection(networkMessages.WIFI_HASNT_CONNECTION);
        if (!wifiConnectionAvailable) return;

        try {
            const signUpDto = SignUpDto.create(data);
            const result = await authService.signUp(signUpDto);

            if (result.emailAlreadyExists) {
                toasterAdapter.showToast(authMessages.EMAIL_ALREADY_REGISTERED);
                await authService.signOut();

                return;
            }

            await authService.signOut();

            const message = translate('messages.auth.signUp', { email: data.email });
            toasterAdapter.showToast(message);
        }
        catch (error) {
            await authService.signOut();
            notificationsService.close();
            clearAuth();

            toasterAdapter.showError(error);
        }
    }

    /**
     * Updates the user's email and handles the necessary validations and status updates.
     *
     * @param {EmailData} emailData - The object containing the email to be updated.
     * @return {Promise<void>} - A promise that resolves when the update is complete.
     */
    const updateEmail = async ({ email }: EmailData): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        try {
            const updateEmailDto = UpdateEmailDto.create(email, state.user.email);
            await authService.updateEmail(updateEmailDto);

            const message = translate('messages.auth.updateEmail', { oldEmail: state.user.email, newEmail: email });
            toasterAdapter.showToast(message, { bottomOffset: 8 });
        }
        catch (error) {
            toasterAdapter.showError(error, { bottomOffset: 8 });
        }
    }

    /**
     * Updates the user's password if the Wi-Fi connection is available.
     *
     * @param {UpdatePasswordData} passwordData - The new password data.
     * @return {Promise<void>} A promise that resolves when the password update is complete.
     */
    const updatePassword = async ({ password }: UpdatePasswordData): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        try {
            const updatePasswordDto = UpdatePasswordDto.create(password);
            await authService.updatePassword(updatePasswordDto);

            toasterAdapter.showToast(authMessages.PASSWORD_UPDATED, { bottomOffset: 8 });
        }
        catch (error) {
            toasterAdapter.showError(error, { bottomOffset: 8 });
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

        try {
            const updateDto = UpdateProfileDto.create(values);
            const user = await authService.updateProfile(updateDto);

            updateUser({ ...state.user, ...user });
            toasterAdapter.showToast(authMessages.PROFILE_UPDATED, { bottomOffset: 8 });
        }
        catch (error) {
            toasterAdapter.showError(error, { bottomOffset: 8 });
        }
    }

    return {
        state,

        // Actions
        clearAuth,

        // Functions
        refreshAuth,
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
