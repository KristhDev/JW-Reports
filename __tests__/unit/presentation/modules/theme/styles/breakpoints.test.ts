/* Theme */
import { breakpoints } from '@theme';

describe('Test in breakpoints of theme', () => {
    it('should to match snapshot breakpoints', () => {
        expect(breakpoints).toMatchSnapshot();
    });
});