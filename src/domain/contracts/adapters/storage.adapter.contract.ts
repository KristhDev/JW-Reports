export abstract class StorageAdapterContract {
    abstract getAllKeys(): string[];
    abstract getItem(key: string): string | null;
    abstract removeItem(key: string): void;
    abstract setItem(key: string, value: any): void;
}