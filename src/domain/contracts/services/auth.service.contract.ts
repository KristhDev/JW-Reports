import { SignUpDto, UpdateEmailDto, UpdatePasswordDto, UpdateProfileDto } from '@domain/dtos';

import { UserEntity } from '@domain/entities';

export abstract class AuthServiceContract {
    public abstract getSession(token: string): Promise<{ user: UserEntity, token: string }>;
    public abstract resetPassword(email: string): Promise<void>;
    public abstract signIn(email: string, password: string): Promise<{ token: string, user: UserEntity }>;
    public abstract signOut(): Promise<void>;
    public abstract signUp(signUpDto: SignUpDto): Promise<{ emailAlreadyExists: boolean }>;
    public abstract updateEmail(updateEmailDto: UpdateEmailDto): Promise<void>;
    public abstract updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<void>;
    public abstract updateProfile(updateProfileDto: UpdateProfileDto): Promise<UserEntity>;
}