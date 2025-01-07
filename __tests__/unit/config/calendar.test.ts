import { locales } from '@config';

describe('Test in calendar config', () => {
    it('should to match snapshot - locales', () => {
        expect(locales).toMatchSnapshot();
    });
});