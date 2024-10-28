/* Errors */
import { DtoError } from '@domain/errors';

/* Auth */
import { authMessages } from '@auth';

export class UpdatePasswordDto {
    private constructor(
        public readonly password: string
    ) {}

    /**
     * Creates a new instance of UpdatePasswordDto.
     *
     * @param {string} password - The new password of the user.
     * @return {UpdatePasswordDto} A new instance of UpdatePasswordDto.
     * @throws {DtoError} If the new password is empty or its length is less than 6.
     */
    public static create(password: string): UpdatePasswordDto {
        if (password.trim().length === 0) throw new DtoError(authMessages.PASSWORD_EMPTY);
        if (password.trim().length < 6) throw new DtoError(authMessages.PASSWORD_MIN_LENGTH);

        return new UpdatePasswordDto(password);
    }
}