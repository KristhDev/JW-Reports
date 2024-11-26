import { MMKV } from 'react-native-mmkv';
import { Storage } from 'reduxjs-toolkit-persist/lib/types';

export const storageKeys = {
    AUTH: 'jwreports-auth',
    STORE_PERMISSIONS: 'jwreports-store-permissions',
    STORE_UI: 'jwreports-store-ui',
    STORE: 'jwreports-store',
    THEME: 'jwreports-theme'
}

export const mmkvStorage = new MMKV();

export const storage = {
    /**
     * Sets a value in the storage.
     *
     * @param {string} key - The key to set the value for.
     * @param {any} value - The value to set.
     * @return {void} This function does not return anything.
     */
    setItem: (key: string, value: any): void => {
        mmkvStorage.set(key, value);
    },

    /**
     * A function to get the value associated with the given key from storage.
     *
     * @param {string} key - The key to retrieve the value for.
     * @return {string | null} The value associated with the key, or null if not found.
     */
    getItem: (key: string): string | null => {
        return mmkvStorage.getString(key) || null;
    },

    /**
     * Removes the value associated with the given key from storage.
     *
     * @param {string} key - The key of the value to remove.
     * @return {void} This function does not return anything.
     */
    removeItem: (key: string): void => {
        mmkvStorage.delete(key);
    }
}

export const storePersistor: Storage = {

    /**
     * Sets the value for the given key in the storage.
     *
     * @param {string} key - The key to set the value for.
     * @param {any} value - The value to set.
     * @return {Promise<boolean>} A promise that resolves to true if the value is successfully set.
     */
    setItem: (key: string, value: any): Promise<boolean> => {
        mmkvStorage.set(key, value);
        return Promise.resolve(true);
    },

    /**
     * Retrieves all keys from the storage.
     *
     * @return {Promise<string[]>} A promise that resolves to an array of all keys in the storage.
     */
    getAllKeys: (): Promise<string[]> => {
        const keys = mmkvStorage.getAllKeys();
        return Promise.resolve(keys);
    },

    /**
     * Retrieves the value associated with the given key from storage.
     *
     * @param {string} key - The key to retrieve the value for.
     * @return {Promise<string | undefined>} The value associated with the key, or undefined if not found.
     */
    getItem: (key: string): Promise<string | undefined> => {
        const value = mmkvStorage.getString(key);
        return Promise.resolve(value);
    },

    /**
     * Removes the value associated with the given key from storage.
     *
     * @param {string} key - The key of the value to remove.
     * @return {Promise<boolean>} A promise that resolves to true if the value is successfully removed.
     */
    removeItem: (key: string): Promise<boolean> => {
        mmkvStorage.delete(key);
        return Promise.resolve(true);
    }
}
