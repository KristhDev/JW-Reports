/* DTOs */
import { UpdateEmailDto } from '@domain/dtos';

/* Errors */
import { DtoError } from '@domain/errors';

/* Auth */
import { authMessages } from '@auth';

describe('Test in UpdateEmailDto', () => {
    it('should convert data to UpdateEmailDto', () => {
        const currentEmail = 'testerunit@gmail.com';
        const newEmail = 'tester2e2@gmail.com';

        const dto = UpdateEmailDto.create(newEmail, currentEmail);

        expect(dto).toBeInstanceOf(UpdateEmailDto);
        expect(dto).toEqual({ email: newEmail });
    });

    it('should throw error if new email is empty', () => {
        const currentEmail = 'testerunit@gmail.com';
        const newEmail = '';

        try {
            UpdateEmailDto.create(newEmail, currentEmail);
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DtoError);
            expect(error).toHaveProperty('message', authMessages.EMAIL_EMPTY);
        }
    });

    it('should throw error if new email is the same as current email', () => {
        const currentEmail = 'testerunit@gmail.com';
        const newEmail = 'testerunit@gmail.com';

        try {
            UpdateEmailDto.create(newEmail, currentEmail);
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DtoError);
            expect(error).toHaveProperty('message', authMessages.EMAIL_UPDATE_UNCHANGED);
        }
    });
});