import { storage } from '../../src/utils';

export const setItemStorageSpy = jest.spyOn(storage, 'setItem');
export const getItemStorageSpy = jest.spyOn(storage, 'getItem');