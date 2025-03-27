import { PermissionStatus } from '@application/features';

import { ImageModel } from '@domain/models'; 

import { CameraType, OpenCameraOptions, OpenPickerOptions } from '@infrastructure/interfaces'; 

export abstract class DeviceImageServiceContract {
    public abstract cameras: Record<Uppercase<CameraType>, CameraType>;
    public abstract getBase64FromUri(uri: string): Promise<string>;
    public abstract getCameraPermission(): Promise<PermissionStatus>;
    public abstract getMediaLibraryPermission(): Promise<PermissionStatus>;
    public abstract openCamera(options: OpenCameraOptions): Promise<ImageModel | undefined>;
    public abstract openPicker(options: OpenPickerOptions): Promise<ImageModel | undefined>;
    public abstract requestCameraPermission(): Promise<PermissionStatus>;
    public abstract requestMediaLibraryPermission(): Promise<PermissionStatus>;
}