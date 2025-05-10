import { Storage } from 'reduxjs-toolkit-persist/lib/types';

import { storageAdapter } from '@config/di';

export const storePersistor: Storage = {

    /**
     * Retrieves all keys from the storage.
     *
     * @return {Promise<string[]>} A promise that resolves to an array of all keys in the storage.
     */
    getAllKeys: (): Promise<string[]> => {
        const keys = storageAdapter.getAllKeys();
        return Promise.resolve(keys);
    },

    /**
     * Retrieves the value associated with the given key from storage.
     *
     * @param {string} key - The key to retrieve the value for.
     * @return {Promise<string | undefined>} The value associated with the key, or undefined if not found.
     */
    getItem: (key: string): Promise<string | undefined> => {
        const value = storageAdapter.getItem(key);
        return Promise.resolve(value || undefined);
    },

    /**
     * Removes the value associated with the given key from storage.
     *
     * @param {string} key - The key of the value to remove.
     * @return {Promise<boolean>} A promise that resolves to true if the value is successfully removed.
     */
    removeItem: (key: string): Promise<boolean> => {
        storageAdapter.removeItem(key);
        return Promise.resolve(true);
    },

    /**
     * Sets the value for the given key in the storage.
     *
     * @param {string} key - The key to set the value for.
     * @param {any} value - The value to set.
     * @return {Promise<boolean>} A promise that resolves to true if the value is successfully set.
     */
    setItem: (key: string, value: any): Promise<boolean> => {
        storageAdapter.setItem(key, value);
        return Promise.resolve(true);
    }
}