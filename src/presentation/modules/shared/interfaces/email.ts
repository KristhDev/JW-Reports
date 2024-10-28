import { ImageModel } from '@domain/models';

export interface ReportErrorOptions {
    image: ImageModel | null;
    message: string;
}