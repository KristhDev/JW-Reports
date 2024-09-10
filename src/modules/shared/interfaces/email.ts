import { Image } from 'react-native-image-crop-picker';

export interface SendEmailOptions {
    email: string;
    imageUrl?: string;
    message: string;
    templateId: string;
}

export interface ReportErrorOptions {
    image: Image | null;
    message: string;
}