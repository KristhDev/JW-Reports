import { AppErrors } from '@domain/errors';

describe('Test in AppErrors', () => {
    it('should have respective methods and properties - AppErrors', () => {
        expect(AppErrors).toHaveProperty('supabaseAuthCodeErrors');
        expect(typeof AppErrors.supabaseAuthCodeErrors).toBe('object');
        expect(AppErrors).toHaveProperty('translateMsg');
        expect(typeof AppErrors.translateMsg).toBe('function');
    });

    it('should translate message - AppErrors', () => {
        const code = 'invalid_credentials';
        const translatedMsg = AppErrors.translateMsg(code);

        expect(translatedMsg).toBe(AppErrors.supabaseAuthCodeErrors[code]);
    });

    it('should return default error when message not found - AppErrors', () => {
        const translatedMsg = AppErrors.translateMsg('code_not_found');
        expect(translatedMsg).toBe('Ocurrió un error al realizar está acción, por favor vuelvalo a intentar.');
    });
});