import { authMessages, precursorMessages, PRECURSORS_OPTIONS } from '@auth';

describe('Test in constants of auth module', () => {
    it('should to match snapshot - PRECURSORS_OPTIONS', () => {
        expect(PRECURSORS_OPTIONS).toMatchSnapshot();
    });

    it('should to match snapshot - authMessages', () => {
        expect(authMessages).toMatchSnapshot();
    });

    it('should to match snapshot - precursorMessages', () => {
        expect(precursorMessages).toMatchSnapshot();
    });
});