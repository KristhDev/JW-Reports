import { HOURS_REQUIREMENTS, preachingMessages, TABLE_PREACHING_HEADERS } from '@preaching';

describe('Test in constants of preaching module', () => {
    it('should to match snapshot - TABLE_PREACHING_HEADERS', () => {
        expect(TABLE_PREACHING_HEADERS).toMatchSnapshot();
    });

    it('should to match snapshot - HOURS_REQUIREMENTS', () => {
        expect(HOURS_REQUIREMENTS).toMatchSnapshot();
    });

    it('should to match snapshot - preachingMessages', () => {
        expect(preachingMessages).toMatchSnapshot();
    });
});