import { asyncStorageKeys } from '../../../src/utils';

describe('Test in util storage-keys', () => {
    it('should match snapshot', () => {
        expect(asyncStorageKeys).toMatchSnapshot();
    });
});