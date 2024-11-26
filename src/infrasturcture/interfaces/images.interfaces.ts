import { ImageModel } from '@domain/models';

export interface DeleteImageOptions {
    bucket: string;
    folder: string;
    uri: string;
}

export interface UploadImageOptions {
    bucket: string;
    folder: string;
    image: ImageModel;
}

export interface OpenPickerOptions {
    cropperActiveWidgetColor: string;
    cropperToolbarTitle: string;
    cropping?: boolean;
    multiple?: boolean;
}

export type OpenCameraOptions = Omit<OpenPickerOptions, 'multiple'>;