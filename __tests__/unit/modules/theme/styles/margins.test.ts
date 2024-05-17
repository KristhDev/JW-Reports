/* Theme */
import { margins } from '../../../../../src/modules/theme';

describe('Test in margins of theme', () => {
    it('should to match snapshot margins', () => {
        expect(margins).toMatchSnapshot();
    });
});