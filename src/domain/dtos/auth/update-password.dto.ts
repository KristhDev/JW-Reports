import { DtoError } from '@domain/errors';

import { authMessages } from '@auth';

export class UpdatePasswordDto {
    private constructor(
        public readonly password: string
    ) {}

    public static create(password: string): UpdatePasswordDto {
        if (password.trim().length === 0) throw new DtoError(authMessages.PASSWORD_EMPTY);
        if (password.trim().length < 6) throw new DtoError(authMessages.PASSWORD_MIN_LENGTH);

        return new UpdatePasswordDto(password);
    }
}