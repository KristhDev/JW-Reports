/* Errors */
import { DtoError } from '@domain/errors';

/* Auth */
import { authMessages } from '@auth';

export class UpdateEmailDto {
    private constructor(
        public readonly email: string
    ) {}

    /**
     * Creates a new instance of UpdateEmailDto.
     *
     * @param {string} newEmail - The new email of the user.
     * @param {string} currentEmail - The current email of the user.
     * @return {UpdateEmailDto} A new instance of UpdateEmailDto.
     * @throws {DtoError} If the new email is empty or the same as the current email.
     */
    public static create(newEmail: string, currentEmail: string): UpdateEmailDto {
        if (newEmail.length === 0) throw new DtoError(authMessages.EMAIL_EMPTY);
        if (newEmail === currentEmail) throw new DtoError(authMessages.EMAIL_UPDATE_UNCHANGED);

        return new UpdateEmailDto(newEmail);
    }
}