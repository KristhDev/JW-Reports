import { THEME_OPTIONS } from '@application/constants';

describe('Test in constants of theme', () => {
    it('should to match snapshot - THEME_OPTIONS', () => {
        expect(THEME_OPTIONS).toMatchSnapshot();
    });
});