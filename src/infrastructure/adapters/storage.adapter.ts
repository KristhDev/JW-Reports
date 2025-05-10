import { MMKV } from 'react-native-mmkv';

import { StorageAdapterContract } from '@domain/contracts/adapters';

export const mmkvStorage = new MMKV();

export class StorageAdapter implements StorageAdapterContract {
    public readonly storage: MMKV

    constructor() {
        this.storage = new MMKV();
    }

    /**
     * Retrieves all keys from the storage.
     *
     * @return {string[]} An array of all keys in the storage.
     */
    public getAllKeys(): string[] {
        return this.storage.getAllKeys();
    }

    /**
     * Sets a value in the storage.
     *
     * @param {string} key - The key to set the value for.
     * @param {any} value - The value to set.
     * @return {void} This function does not return anything.
     */
    public setItem(key: string, value: any): void {
        this.storage.set(key, value);
    }

    /**
     * A function to get the value associated with the given key from storage.
     *
     * @param {string} key - The key to retrieve the value for.
     * @return {string | null} The value associated with the key, or null if not found.
     */
    public getItem(key: string): string | null {
        return this.storage.getString(key) || null;
    }

    /**
     * Removes the value associated with the given key from storage.
     *
     * @param {string} key - The key of the value to remove.
     * @return {void} This function does not return anything.
     */
    public removeItem(key: string): void {
        this.storage.delete(key);
    }
}
