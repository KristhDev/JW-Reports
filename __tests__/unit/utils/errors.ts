/* Utils */
import { AppErrors, EmailError, ImageError } from '@utils';

describe('Test in errors util', () => {
    it('should have respective methods and properties - AppErrors', () => {
        expect(AppErrors).toHaveProperty('supabaseAuthErrors');
        expect(AppErrors).toHaveProperty('supabaseCommonErrors');
        expect(AppErrors).toHaveProperty('translateMsg');
    });

    it('should translate message - AppErrors', () => {
        const msg = 'Invalid login credentials';
        const translatedMsg = AppErrors.translateMsg(msg);

        expect(translatedMsg).toBe(AppErrors.supabaseAuthErrors[msg]);
    });

    it('should return default error when message not found - AppErrors', () => {
        const translatedMsg = AppErrors.translateMsg('Message not found');
        expect(translatedMsg).toBe('Ocurrió un error al realizar está acción, por favor vuelvalo a intentar.');
    });

    it('should render properties in error instance - EmailError', () => {
        const error = new EmailError('Email not sent');

        expect(error.message).toBe('Email not sent');
        expect(error.name).toBe('EmailError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(EmailError);
    });

    it('should render properties in error instance - ImageError', () => {
        const error = new ImageError('Image not stored');

        expect(error.message).toBe('Image not stored');
        expect(error.name).toBe('ImageError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ImageError);
    });
});