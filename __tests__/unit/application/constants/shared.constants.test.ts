import { emailMessages, networkMessages, permissionsMessages } from '@application/constants';

describe('Test in constants of shared', () => {
    it('should to match snapshot - permissionsMessages', () => {
        expect(permissionsMessages).toMatchSnapshot();
    });

    it('should to match snapshot - emailMessages', () => {
        expect(emailMessages).toMatchSnapshot();
    });

    it('should to match snapshot - networkMessages', () => {
        expect(networkMessages).toMatchSnapshot();
    });
});