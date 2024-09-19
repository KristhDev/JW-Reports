import { localeEs } from '@utils';

describe('Test in calendar util', () => {
    it('should to match snapshot - localeEs', () => {
        expect(localeEs).toMatchSnapshot();
    });
});