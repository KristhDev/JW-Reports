import { authMessages, precursorMessages, precursors, PRECURSORS_OPTIONS } from '@application/constants';

describe('Test in constants of auth module', () => {
    it('should to match snapshot - PRECURSORS_OPTIONS', () => {
        expect(PRECURSORS_OPTIONS).toMatchSnapshot();
    });

    it('should to match snapshot - precursors', () => {
        expect(precursors).toMatchSnapshot();
    });

    it('should to match snapshot - authMessages', () => {
        expect(authMessages).toMatchSnapshot();
    });

    it('should to match snapshot - precursorMessages', () => {
        expect(precursorMessages).toMatchSnapshot();
    });
});