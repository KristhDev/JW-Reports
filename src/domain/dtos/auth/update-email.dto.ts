import { DtoError } from '@domain/errors';

import { authMessages } from '@auth';

export class UpdateEmailDto {
    private constructor(
        public readonly email: string
    ) {}

    static create(newEmail: string, currentEmail: string): UpdateEmailDto | DtoError {
        if (newEmail.length === 0) {
            return new DtoError(authMessages.EMAIL_EMPTY);
        }

        if (newEmail === currentEmail) {
            return new DtoError(authMessages.EMAIL_UPDATE_UNCHANGED);
        }

        return new UpdateEmailDto(newEmail);
    }
}