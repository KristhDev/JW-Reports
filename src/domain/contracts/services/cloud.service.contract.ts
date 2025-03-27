import { DeleteImageOptions, UploadImageOptions } from '@infrastructure/interfaces';

export abstract class CloudServiceContract {
    public abstract deleteImage(options: DeleteImageOptions): Promise<void>;
    public abstract uploadImage(options: UploadImageOptions): Promise<string>;
}