/* Constants */
import { authMessages } from '@application/constants';

/* DTOs */
import { UpdatePasswordDto } from '@domain/dtos';

/* Errors */
import { DtoError } from '@domain/errors';

describe('Test in UpdatePasswordDto', () => {
    it('should convert data to UpdatePasswordDto', () => {
        const password = 'tester-unit-1234';

        const dto = UpdatePasswordDto.create(password);

        expect(dto).toBeInstanceOf(UpdatePasswordDto);
        expect(dto).toEqual({ password });
    });

    it('should throw error if password is empty', () => {
        try {
            UpdatePasswordDto.create('');
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DtoError);
            expect(error).toHaveProperty('message', authMessages.PASSWORD_EMPTY);
        }
    });

    it('should throw error if length of password is less than 6', () => {
        const password = '12345';

        try {
            UpdatePasswordDto.create(password);
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DtoError);
            expect(error).toHaveProperty('message', authMessages.PASSWORD_MIN_LENGTH);
        }
    });
});