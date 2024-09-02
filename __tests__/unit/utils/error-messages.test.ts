import { authErrorMessages, commonErrorMessages, translateErrorMsg } from '@utils';

describe('Test in util error-messages', () => {
    it('should match snapshot authErrorMessages', () => {
        expect(authErrorMessages).toMatchSnapshot();
    });

    it('should match snapshot commonErrorMessages', () => {
        expect(commonErrorMessages).toMatchSnapshot();
    });

    it('should trasnlate error if find message', () => {
        const msg = 'Invalid login credentials';
        const translatedMsg = translateErrorMsg(msg);

        expect(translatedMsg).toBe(authErrorMessages[msg]);
    });

    it('should default error message if not find message', () => {
        const translatedMsg = translateErrorMsg('Not found message');
        expect(translatedMsg).toBe('Ocurrió un error al realizar está acción, por favor vuelvalo a intentar.')
    });
});