/* Theme */
import { margins } from '@theme';

describe('Test in margins of theme', () => {
    it('should to match snapshot margins', () => {
        expect(margins).toMatchSnapshot();
    });
});