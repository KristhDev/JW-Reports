/* Theme */
import { fontSizes } from '../../../../../src/modules/theme';

describe('Test in fontSizes of theme', () => {
    it('should to match snapshot fontSizes', () => {
        expect(fontSizes).toMatchSnapshot();
    });
});