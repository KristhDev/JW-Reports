import { THEME_OPTIONS } from '@theme';

describe('Test in constants of theme module', () => {
    it('should to match snapshot - THEME_OPTIONS', () => {
        expect(THEME_OPTIONS).toMatchSnapshot();
    });
});