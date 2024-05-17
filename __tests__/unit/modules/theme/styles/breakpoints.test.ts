/* Theme */
import { breakpoints } from '../../../../../src/modules/theme';

describe('Test in breakpoints of theme', () => {
    it('should to match snapshot breakpoints', () => {
        expect(breakpoints).toMatchSnapshot();
    });
});