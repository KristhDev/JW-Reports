import { ImageModel } from '@domain/models';
import { CameraType } from './services.interfaces';

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
    cropping?: boolean;
}

export type OpenCameraOptions = OpenPickerOptions & {
    cameraType: CameraType;
}