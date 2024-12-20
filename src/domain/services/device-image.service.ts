import ImageCropPicker from 'react-native-image-crop-picker';

/* Errors */
import { ImageError } from '@domain/errors';

/* Models */
import { ImageModel } from '@domain/models';

/* Interfaces */
import { OpenCameraOptions, OpenPickerOptions } from '@infrasturcture/interfaces';

export class DeviceImageService {
    private static readonly cropperStatusBarColor: string = '#000000';
    private static readonly cropperToolbarColor: string = '#000000';
    private static readonly cropperWidgetColor: string = '#FFFFFF';

    /**
     * Cleans the temporary files created by the library.
     * @returns A promise that resolves when the cleaning is done.
     */
    public static async clean(): Promise<void> {
        await ImageCropPicker.clean();
    }

    /**
     * Converts an image URI to a Base64 string.
     * This method fetches the image located at the provided URI, reads it as a Blob,
     * and converts it to a Base64-encoded string using a FileReader.
     *
     * @param {string} uri - The URI of the image to convert.
     * @returns {Promise<string>} - A promise that resolves with the Base64 string of the image.
     * @throws {ImageError} - If an error occurs during fetching or reading the image.
     */
    public static async getBase64FromUri(uri: string): Promise<string> {
        try {
            const blob = await fetch(uri).then(res => res.blob());
            const reader = new FileReader();

            const base64 = new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });

            return base64 as any;
        }
        catch (error) {
            const imageError = new ImageError((error as any).message);
            console.error(imageError);
            throw imageError;
        }
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
                cropperStatusBarColor: this.cropperStatusBarColor,
                cropperToolbarColor: this.cropperToolbarColor,
                cropperToolbarTitle: options.cropperToolbarTitle,
                cropperToolbarWidgetColor: this.cropperWidgetColor,
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
            const imageError = new ImageError((error as any).message, (error as any).code);
            console.error(imageError);
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
                cropperStatusBarColor: this.cropperStatusBarColor,
                cropperToolbarColor: this.cropperToolbarColor,
                cropperToolbarTitle: options.cropperToolbarTitle,
                cropperToolbarWidgetColor: this.cropperWidgetColor,
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
            const imageError = new ImageError((error as any).message, (error as any).code);
            console.error(imageError);
            throw imageError;
        }
    }
}