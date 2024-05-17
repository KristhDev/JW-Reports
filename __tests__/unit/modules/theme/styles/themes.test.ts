/* Theme */
import { darkTheme, lightTheme } from '../../../../../src/modules/theme';

describe('Test in themes', () => {
    it('should to match snapshot light theme', () => {
        expect(lightTheme).toMatchSnapshot();
    });

    it('should to match snapshot dark theme', () => {
        expect(darkTheme).toMatchSnapshot();
    });
});