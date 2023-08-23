
/* Utils */
import { PRECURSORS_OPTIONS, TABLE_PREACHING_HEADERS, THEME_OPTIONS, HOURS_REQUIREMENTS } from '../../src/utils';

describe('Test in Constants util', () => {
    it('should to match snapshot TABLE_PREACHING_HEADERS', () => {
        expect(TABLE_PREACHING_HEADERS).toMatchSnapshot();
    });

    it('should to match snapshot PRECURSORS_OPTIONS', () => {
        expect(PRECURSORS_OPTIONS).toMatchSnapshot();
    });

    it('should to match snapshot THEME_OPTIONS', () => {
        expect(THEME_OPTIONS).toMatchSnapshot();
    });

    it('should to match snapshot HOURS_REQUIREMENTS', () => {
        expect(HOURS_REQUIREMENTS).toMatchSnapshot();
    });
});