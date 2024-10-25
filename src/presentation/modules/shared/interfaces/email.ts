import { ImageModel } from '@domain/models';

export interface SendEmailOptions {
    email: string;
    imageUrl?: string;
    message: string;
    templateId: string;
}

export interface ReportErrorOptions {
    image: ImageModel | null;
    message: string;
}