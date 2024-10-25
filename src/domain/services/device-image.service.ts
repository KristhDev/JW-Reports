import ImageCropPicker from 'react-native-image-crop-picker';

/* Errors */
import { ImageError } from '@domain/errors';

/* Models */
import { ImageModel } from '@domain/models';

/* Interfaces */
import { OpenCameraOptions, OpenPickerOptions } from '@infrasturcture/interfaces';

export class DeviceImageService {
    /**
     * Cleans the temporary files created by the library.
     * @returns A promise that resolves when the cleaning is done.
     */
    public static async clean(): Promise<void> {
        await ImageCropPicker.clean();
    }

    /**
     * Opens the device's camera to take a new photo.
     *
     * The method returns a promise that resolves with an `ImageModel` object
     * containing the image data, mime type, path, height, and width.
     *
     * If the user cancels the operation, the promise is rejected with an
     * `ImageError` object containing the message "User cancelled image selection".
     *
     * @param options Options to customize the camera.
     * @returns A promise that resolves with an `ImageModel` object containing
     * the selected image.
     * @throws {ImageError} If the user cancels the operation.
     */
    public static async openCamera(options: OpenCameraOptions): Promise<ImageModel> {
        try {
            const result = await ImageCropPicker.openCamera({
                cropperActiveWidgetColor: options.cropperActiveWidgetColor,
                cropperStatusBarColor: '#000000',
                cropperToolbarColor: '#000000',
                cropperToolbarTitle: options.cropperToolbarTitle,
                cropperToolbarWidgetColor: '#FFFFFF',
                cropping: options.cropping,
                freeStyleCropEnabled: true,
                includeBase64: true,
                mediaType: 'photo',
            });

            return {
                data: result?.data!,
                mime: result.mime,
                path: result.path,
                height: result.height,
                width: result.width
            }
        }
        catch (error) {
            const imageError = new ImageError((error as any).message);
            console.log(imageError);
            throw imageError;
        }
    }

    /**
     * Opens the device's photo library to select one or more photos.
     *
     * The method returns a promise that resolves with an array of `ImageModel`
     * objects containing the image data, mime type, path, height, and width.
     *
     * If the user cancels the operation, the promise is rejected with an
     * `ImageError` object containing the message "User cancelled image selection).
     *
     * @param options Options to customize the picker.
     * @returns A promise that resolves with an array of `ImageModel` objects.
     * @throws {ImageError} If the user cancels the operation.
     */
    public static async openPicker(options: OpenPickerOptions): Promise<ImageModel> {
        try {
            const result = await ImageCropPicker.openPicker({
                cropperActiveWidgetColor: options.cropperActiveWidgetColor,
                cropperStatusBarColor: '#000000',
                cropperToolbarColor: '#000000',
                cropperToolbarTitle: options.cropperToolbarTitle,
                cropperToolbarWidgetColor: '#FFFFFF',
                cropping: options.cropping,
                freeStyleCropEnabled: true,
                includeBase64: true,
                mediaType: 'photo',
                multiple: options.multiple
            });

            return {
                data: result?.data!,
                mime: result.mime,
                path: result.path,
                height: result.height,
                width: result.width
            }
        }
        catch (error) {
            const imageError = new ImageError((error as any).message);
            console.log(imageError);
            throw imageError;
        }
    }
}