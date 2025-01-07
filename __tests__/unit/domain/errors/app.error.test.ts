/* Errors */
import { AppErrors } from '@domain/errors';

describe('Test in AppErrors', () => {
    it('should have respective methods and properties - AppErrors', () => {
        expect(AppErrors).toHaveProperty('getMessageFromCode');
        expect(typeof AppErrors.getMessageFromCode).toBe('function');
    });

    it('should get message from code - AppErrors', () => {
        const code = 'invalid_credentials';
        const message = AppErrors.getMessageFromCode(code);

        expect(message).toBe('Las credenciales son inválidas.');
    });
});