import { PRECURSORS_OPTIONS } from '@auth';

describe('Test in constants of auth module', () => {
    it('should to match snapshot - PRECURSORS_OPTIONS', () => {
        expect(PRECURSORS_OPTIONS).toMatchSnapshot();
    });
});