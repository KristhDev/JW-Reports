import { AuthResponse } from '@supabase/supabase-js';

/* Config */
import { supabase } from '@config';

/* DTOs */
import { SignUpDto, UpdateEmailDto, UpdatePasswordDto, UpdateProfileDto } from '@domain/dtos';

/* Entities */
import { UserEntity } from '@domain/entities';

/* Errors */
import { RequestError } from '@domain/errors';

/* Interfaces */
import { UserEndpoint } from '@infrasturcture/interfaces';

/* Env */
import { SITIE_URL } from '@env';

export class AuthService {
    /**
     * Get the session and the user from the given token.
     *
     * @param {string} token The token to get the session and user from.
     * @return {Promise<{ user: UserEntity, token: string }>} A promise that resolves with an object containing the user and token.
     */
    public static async getSession(token: string): Promise<{ user: UserEntity, token: string }> {
        const user = await supabase.auth.getUser(token);
        const session = await supabase.auth.getSession();

        const response: AuthResponse = {
            data: {
                session: session.data?.session,
                user: user.data?.user
            },
            error: user?.error || session?.error
        } as AuthResponse;

        if (response.error) {
            throw new RequestError(
                response.error.message,
                response.error.status || 400,
                response.error.code || ''
            );
        }

        const userEntity = UserEntity.fromEndpoint({
            ...response.data.user!.user_metadata,
            id: response.data.user!.id,
            email: response.data.user!.email,
            createdAt: response.data!.user!.created_at,
            updatedAt: response.data.user!.updated_at
        } as UserEndpoint);

        const newToken = response.data.session!.access_token;

        return { user: userEntity, token: newToken }
    }

    /**
     * Resets the password for a user with the given email.
     *
     * @param {string} email - The email of the user whose password is being reset.
     */
    public static async resetPassword(email: string): Promise<void> {
        const result = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${ SITIE_URL }/reset-password`
        });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.error.status || 400,
                result.error.code || ''
            );
        }
    }

    /**
     * Signs in a user with the given email and password.
     *
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @return {Promise<{ token: string, user: UserEntity }>} A promise that resolves with an object containing the access token.
     */
    public static async signIn(email: string, password: string): Promise<{ token: string, user: UserEntity }> {
        const result = await supabase.auth.signInWithPassword({ email, password });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.error.status || 400,
                result.error.code || ''
            );
        }

        const user = UserEntity.fromEndpoint({
            ...result.data.user!.user_metadata!,
            id: result.data.user.id,
            email: result.data.user.email!,
            createdAt: result.data.user.created_at!,
            updatedAt: result.data.user.updated_at!
        } as UserEndpoint);

        const token = result.data.session.access_token;

        return {
            token,
            user
        }
    }

    /**
     * Signs out the user.
     *
     * @return {Promise<void>} A promise that resolves when the sign-out process is complete.
     * @throws {RequestError} If the request fails.
     */
    public static async signOut(): Promise<void> {
        const result = await supabase.auth.signOut();

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.error?.status || 400,
                result.error?.code || ''
            );
        }
    }

    /**
     * Signs up a user with the given email and password.
     *
     * @param {SignUpDto} data - The data of the user to sign up.
     * @return {Promise<{ emailAlreadyExists: boolean }>} A promise that resolves with an object containing the emailAlreadyExists flag.
     */
    public static async signUp({ email, password, ...rest }: SignUpDto): Promise<{ emailAlreadyExists: boolean }> {
        const result = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: rest
            }
        });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.error.status || 400,
                result.error.code || ''
            );
        }

        return {
            emailAlreadyExists: (result?.data?.user?.identities?.length === 0)
        }
    }

    /**
     * Updates the user's email.
     *
     * @param {UpdateEmailDto} dto - The update email data transfer object.
     * @return {Promise<void>} A promise that resolves when the email update is complete.
     */
    public static async updateEmail(dto: UpdateEmailDto): Promise<void> {
        const result = await supabase.auth.updateUser({ email: dto.email });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.error.status || 400,
                result.error.code || ''
            );
        }
    }

    /**
     * Updates the user's password.
     *
     * @param {UpdatePasswordDto} dto - The update password data transfer object.
     * @return {Promise<void>} A promise that resolves when the password update is complete.
     */
    public static async updatePassword(dto: UpdatePasswordDto): Promise<void> {
        const result = await supabase.auth.updateUser({ password: dto.password });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.error.status || 400,
                result.error.code || ''
            );
        }
    }

    /**
     * Updates the user's profile.
     *
     * @param {UpdateProfileDto} dto - The update profile data transfer object.
     * @return {Promise<UserEntity>} A promise that resolves with the user response.
     */
    public static async updateProfile(dto: UpdateProfileDto): Promise<UserEntity> {
        const result = await supabase.auth.updateUser({ data: dto });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.error.status || 400,
                result.error.code || ''
            );
        }

        const userEndpoint = result.data.user;

        const user = UserEntity.fromEndpoint({
            ...userEndpoint!.user_metadata!,
            id: userEndpoint.id,
            email: userEndpoint.email!,
            createdAt: userEndpoint.created_at!,
            updatedAt: userEndpoint.updated_at!
        } as UserEndpoint);

        return user;
    }
}