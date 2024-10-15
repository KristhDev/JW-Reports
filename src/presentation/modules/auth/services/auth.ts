import { AuthResponse, AuthTokenResponsePassword, UserResponse } from '@supabase/supabase-js';

/* Config */
import { supabase } from '@config';

/* DTOs */
import { SignUpDto, UpdateProfileDto } from '@domain/dtos';

/* Env */
import { SITIE_URL } from '@env';

export class AuthService {
    /**
     * Get the session and the user from the given token.
     *
     * @param {string} token The token to get the session and user from.
     * @return An object with the session and user if the token is valid, otherwise an error.
     */
    public static async getSession(token: string) {
        const user = await supabase.auth.getUser(token);
        const session = await supabase.auth.getSession();

        const response: AuthResponse = {
            data: {
                session: session.data?.session,
                user: user.data?.user
            },
            error: user?.error || session?.error
        } as AuthResponse;

        return response;
    }

    /**
     * Resets the password for a user with the given email.
     *
     * @param {string} email - The email of the user whose password is being reset.
     */
    public static async resetPassword(email: string) {
        const result = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${ SITIE_URL }/reset-password`
        });

        return result;
    }

    /**
     * Signs in a user with the given email and password.
     *
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @return {Promise<AuthTokenResponsePassword>} A promise that resolves with an object containing the access token.
     */
    public static async signIn(email: string, password: string): Promise<AuthTokenResponsePassword> {
        const result = await supabase.auth.signInWithPassword({ email, password });
        return result;
    }

    /**
     * Signs out the current user. If the user is not authenticated, this call is a no-op.
     */
    public static async signOut() {
        const result = await supabase.auth.signOut();
        return result;
    }

    /**
     * Signs up a user with the given email and password.
     *
     * @param {SignUpDto} data - The data of the user to sign up.
     * @return {Promise<{ data: UserResponse, error: Error | null, emailAlreadyExists: boolean }>} A promise that resolves with an object containing the user response, error and emailAlreadyExists flag.
     */
    public static async signUp({ email, password, ...rest }: SignUpDto): Promise<AuthResponse & { emailAlreadyExists: boolean }> {
        const result = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: rest
            }
        });

        return {
            ...result,
            emailAlreadyExists: (result?.data?.user?.identities?.length === 0)
        }
    }

    /**
     * Updates the user's email.
     *
     * @param {string} email - The new email of the user.
     * @return {Promise<UserResponse>} A promise that resolves with the user response.
     */
    public static async updateEmail(email: string): Promise<UserResponse> {
        const result = await supabase.auth.updateUser({ email });
        return result;
    }

    /**
     * Updates the user's password.
     *
     * @param {string} password - The new password of the user.
     * @return {Promise<UserResponse>} A promise that resolves with the user response.
     */
    public static async updatePassword(password: string): Promise<UserResponse> {
        const result = await supabase.auth.updateUser({ password });
        return result;
    }

    /**
     * Updates the user's profile.
     *
     * @param {UpdateProfileDto} dto - The update profile data transfer object.
     * @return {Promise<UserResponse>} A promise that resolves with the user response.
     */
    public static async updateProfile(dto: UpdateProfileDto): Promise<UserResponse> {
        const result = await supabase.auth.updateUser({ data: dto });
        return result;
    }
}