import { EncodingValue, RenameOptions } from '@infrastructure/interfaces';

export abstract class InternalStorageAdapterContract {
    public abstract deleteFile(path: string): Promise<void>;
    public abstract readFile(path: string, encoding: EncodingValue): Promise<string>;
    public abstract rename(options: RenameOptions): Promise<void>
}