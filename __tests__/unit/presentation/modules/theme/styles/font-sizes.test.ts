/* Theme */
import { fontSizes } from '@theme';

describe('Test in fontSizes of theme', () => {
    it('should to match snapshot fontSizes', () => {
        expect(fontSizes).toMatchSnapshot();
    });
});