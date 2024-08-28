import { storage } from '../../src/utils';

export const storageSpy = {
    getItem: jest.spyOn(storage, 'getItem'),
    setItem: jest.spyOn(storage, 'setItem')
}
