/* Services */
import { AuthService } from '@domain/services';

describe('Test in AuthService', () => {
    it('should have respective methods', () => {
        expect(AuthService).toHaveProperty('getSession');
        expect(typeof AuthService.getSession).toBe('function');

        expect(AuthService).toHaveProperty('resetPassword');
        expect(typeof AuthService.resetPassword).toBe('function');

        expect(AuthService).toHaveProperty('signIn');
        expect(typeof AuthService.signIn).toBe('function');

        expect(AuthService).toHaveProperty('signUp');
        expect(typeof AuthService.signUp).toBe('function');

        expect(AuthService).toHaveProperty('signOut');
        expect(typeof AuthService.signOut).toBe('function');

        expect(AuthService).toHaveProperty('updateEmail');
        expect(typeof AuthService.updateEmail).toBe('function');

        expect(AuthService).toHaveProperty('updatePassword');
        expect(typeof AuthService.updatePassword).toBe('function');

        expect(AuthService).toHaveProperty('updateProfile');
        expect(typeof AuthService.updateProfile).toBe('function');
    });
});