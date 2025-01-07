import { storageKeys, storage, storePersistor } from '@infrasturcture/adapters';

describe('Test in storage adapter', () => {
    it('should match snapshot - storageKeys', () => {
        expect(storageKeys).toMatchSnapshot();
    });

    it('should have respective methods - storage', () => {
        expect(storage).toEqual({
            getItem: expect.any(Function),
            setItem: expect.any(Function),
            removeItem: expect.any(Function)
        });
    });

    it('should have respective methods - storePersistor', () => {
        expect(storePersistor).toEqual({
            getAllKeys: expect.any(Function),
            getItem: expect.any(Function),
            removeItem: expect.any(Function),
            setItem: expect.any(Function),
        });
    });
});