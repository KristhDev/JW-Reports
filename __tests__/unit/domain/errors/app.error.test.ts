/* Constants */
import { appMessages } from '@application/constants';

/* Errors */
import { AppErrors } from '@domain/errors';

describe('Test in AppErrors', () => {
    it('should have respective methods and properties - AppErrors', () => {
        expect(AppErrors).toHaveProperty('getMessageFromCode');
        expect(typeof AppErrors.getMessageFromCode).toBe('function');

        expect(AppErrors).toHaveProperty('translateMessage');
        expect(typeof AppErrors.translateMessage).toBe('function');
    });

    it('should get message from code - AppErrors', () => {
        const code = 'invalid_credentials';
        const message = AppErrors.getMessageFromCode(code);

        expect(message).toBe('Las credenciales son inválidas.');
    });

    it('should return default error when message not found - AppErrors', () => {
        const translatedMsg = AppErrors.getMessageFromCode('code_not_found');
        expect(translatedMsg).toBe(appMessages.UNEXPECTED_ERROR);
    });
});