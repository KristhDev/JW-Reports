import { reportErrorDefaultImgs } from '@shared';

describe('Test in constants util', () => {
    it('should to match snapshot - reportErrorDefaultImgs', () => {
        expect(reportErrorDefaultImgs).toMatchSnapshot();
    });
});