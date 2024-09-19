import { emailMessages, networkMessages, permissionsMessages, permissionsStatus, reportErrorDefaultImgs } from '@shared';

describe('Test in constants util', () => {
    it('should to match snapshot - reportErrorDefaultImgs', () => {
        expect(reportErrorDefaultImgs).toMatchSnapshot();
    });

    it('should to match snapshot - permissionsMessages', () => {
        expect(permissionsMessages).toMatchSnapshot();
    });

    it('should to match snapshot - permissionsStatus', () => {
        expect(permissionsStatus).toMatchSnapshot();
    });

    it('should to match snapshot - emailMessages', () => {
        expect(emailMessages).toMatchSnapshot();
    });

    it('should to match snapshot - networkMessages', () => {
        expect(networkMessages).toMatchSnapshot();
    });
});