import { MoveFileOptions } from '@infrastructure/interfaces';

export abstract class ExternalStorageAdapterContract {
    public abstract moveFileOfInternalExtorage(options: MoveFileOptions): Promise<void>;
}