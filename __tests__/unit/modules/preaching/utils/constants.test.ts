import { TABLE_PREACHING_HEADERS } from '@preaching';

describe('Test in constants of preaching module', () => {
    it('should to match snapshot - TABLE_PREACHING_HEADERS', () => {
        expect(TABLE_PREACHING_HEADERS).toMatchSnapshot();
    });
});