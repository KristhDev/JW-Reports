import { permissionsStatus, reportErrorDefaultImgs } from '@shared';

describe('Test in constants util', () => {
    it('should to match snapshot - reportErrorDefaultImgs', () => {
        expect(reportErrorDefaultImgs).toMatchSnapshot();
    });

    it('should to match snapshot - permissionsStatus', () => {
        expect(permissionsStatus).toMatchSnapshot();
    });
});