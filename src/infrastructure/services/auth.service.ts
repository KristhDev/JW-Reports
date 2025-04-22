/* Config */
import { env } from '@config/env';
import { supabase } from '@config/supabase';

/* Contracts */
import { AuthServiceContract } from '@domain/contracts/services';

/* DTOs */
import { SignUpDto, UpdateEmailDto, UpdatePasswordDto, UpdateProfileDto } from '@domain/dtos';

/* Entities */
import { UserEntity } from '@domain/entities';

/* Errors */
import { RequestError } from '@domain/errors';

/* Interfaces */
import { UserEndpoint } from '@infrastructure/interfaces';

export class AuthService implements AuthServiceContract {
    /**
     * Refreshes the session given a valid refresh token.
     *
     * @param {string} token - The refresh token to refresh the session.
     * @return {Promise<{ user: UserEntity, token: string }>} A promise that resolves with an object containing the new refresh token and the user.
     * @throws {RequestError} If the request fails.
     */
    public async refreshSession(token: string): Promise<{ user: UserEntity; token: string; }> {
        const result = await supabase.auth.refreshSession({ refresh_token: token });

        if (result.error) {
            throw new RequestError(
                result.error.message,
                result.error.status || 400,
                result.error.code || ''
            );
        }

        const userEntity = UserEntity.fromEndpoint({
            ...result.data.user!.user_metadata,
            id: result.data.user!.id,
            email: result.data.user!.email,
            created_at: result.data!.user!.created_at,
            updated_at: result.data.user!.updated_at
        } as UserEndpoint);

        const newToken = result.data.session!.refresh_token;

        return { 
            token: newToken,
            user: userEntity 
        }
    }

    /**
     * Resets the password for a user with the given email.
     *
     * @param {string} email - The email of the user whose password is being reset.
     */
    public async resetPassword(email: string): Promise<void> {
        const result = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${ env.SITE_URL }/reset-password`
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
    public async signIn(email: string, password: string): Promise<{ token: string, user: UserEntity }> {
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
            created_at: result.data.user.created_at!,
            updated_at: result.data.user.updated_at!
        } as UserEndpoint);

        const token = result.data.session.refresh_token;

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
    public async signOut(): Promise<void> {
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
    public async signUp({ email, password, ...rest }: SignUpDto): Promise<{ emailAlreadyExists: boolean }> {
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
    public async updateEmail(dto: UpdateEmailDto): Promise<void> {
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
    public async updatePassword(dto: UpdatePasswordDto): Promise<void> {
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
    public async updateProfile(dto: UpdateProfileDto): Promise<UserEntity> {
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
            created_at: userEndpoint.created_at!,
            updated_at: userEndpoint.updated_at!
        } as UserEndpoint);

        return user;
    }
}