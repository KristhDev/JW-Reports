import { THEME_OPTIONS } from '../../../../../src/modules/theme';

describe('Test in constants of theme module', () => {
    it('should to match snapshot - THEME_OPTIONS', () => {
        expect(THEME_OPTIONS).toMatchSnapshot();
    });
});