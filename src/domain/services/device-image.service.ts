import * as ImagePicker from 'expo-image-picker';

/* Constants */
import { permissionsStatus } from '@application/constants';

/* Features */
import { PermissionStatus } from '@application/features';

/* Errors */
import { ImageError } from '@domain/errors';

/* Models */
import { ImageModel } from '@domain/models';

/* Interfaces */
import { CameraType, OpenCameraOptions, OpenPickerOptions } from '@infrastructure/interfaces';

export class DeviceImageService {
    public static cameras: Record<Uppercase<CameraType>, CameraType> = {
        BACK: 'back',
        FRONT: 'front'
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
     * Retrieves the current permission status for the camera.
     *
     * This method uses the `expo-image-picker` library to get the camera permission status
     * on the device. It returns a promise that resolves with the current permission status,
     * which can be one of the following: 'granted', 'denied', or 'undetermined'.
     *
     * @returns {Promise<PermissionStatus>} A promise that resolves with the current camera permission status.
     */
    public static async getCameraPermission(): Promise<PermissionStatus> {
        const result = await ImagePicker.getCameraPermissionsAsync();
        const isUndetermined = result.status === permissionsStatus.UNDETERMINED;

        if (result.granted) return permissionsStatus.GRANTED;
        if (isUndetermined) return permissionsStatus.UNDETERMINED;
        if (result.canAskAgain && !isUndetermined) return permissionsStatus.DENIED;
        if (!result.canAskAgain && !isUndetermined) return permissionsStatus.BLOCKED;

        return permissionsStatus.UNAVAILABLE;
    }

    /**
     * Retrieves the current permission status for the media library.
     *
     * This method uses the `expo-image-picker` library to get the media library permission status
     * on the device. It returns a promise that resolves with the current permission status,
     * which can be one of the following: 'granted', 'denied', or 'undetermined'.
     *
     * @returns {Promise<PermissionStatus>} A promise that resolves with the current media library permission status.
     */
    public static async getMediaLibraryPermission(): Promise<PermissionStatus> {
        const result = await ImagePicker.getMediaLibraryPermissionsAsync();
        const isUndetermined = result.status === permissionsStatus.UNDETERMINED;

        if (result.granted) return permissionsStatus.GRANTED;
        if (isUndetermined) return permissionsStatus.UNDETERMINED;
        if (result.canAskAgain && !isUndetermined) return permissionsStatus.DENIED;
        if (!result.canAskAgain && !isUndetermined) return permissionsStatus.BLOCKED;

        return permissionsStatus.UNAVAILABLE;
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
     * @returns {Promise<ImageModel | undefined>} A promise that resolves with an `ImageModel` object.
     * @throws {ImageError} If the user cancels the operation.
     */
    public static async openCamera(options: OpenCameraOptions): Promise<ImageModel | undefined> {
        try {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: options.cropping,
                allowsMultipleSelection: false,
                base64: true,
                cameraType: options.cameraType as any,
                mediaTypes: [ 'images' ]
            });

            if (result.canceled) return;

            return {
                data: result.assets[0].base64!,
                mime: result.assets[0].mimeType!,
                path: result.assets[0].uri!,
                height: result.assets[0].height,
                width: result.assets[0].width
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
     * @returns {Promise<ImageModel | undefined>} A promise that resolves with an array of `ImageModel` objects.
     * @throws {ImageError} If the user cancels the operation.
     */
    public static async openPicker(options: OpenPickerOptions): Promise<ImageModel | undefined> {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: options.cropping,
                allowsMultipleSelection: false,
                base64: true,
                mediaTypes: [ 'images' ],
            });

            if (result.canceled) return;

            return {
                data: result.assets[0].base64!,
                mime: result.assets[0].mimeType!,
                path: result.assets[0].uri!,
                height: result.assets[0].height,
                width: result.assets[0].width
            }
        }
        catch (error) {
            const imageError = new ImageError((error as any).message, (error as any).code);
            console.error(imageError);
            throw imageError;
        }
    }

    /**
     * Requests the camera permission from the user.
     *
     * This method uses the `expo-image-picker` library to prompt the user for camera access permission.
     * It returns a promise that resolves with the permission status, which can be one of the following:
     * 'granted', 'denied', or 'undetermined'.
     *
     * @returns {Promise<PermissionStatus>} A promise that resolves with the current camera permission status.
     */
    public static async requestCameraPermission(): Promise<PermissionStatus> {
        const result = await ImagePicker.requestCameraPermissionsAsync();
        const isUndetermined = result.status === permissionsStatus.UNDETERMINED;

        if (result.granted) return permissionsStatus.GRANTED;
        if (isUndetermined) return permissionsStatus.UNDETERMINED;
        if (result.canAskAgain && !isUndetermined) return permissionsStatus.DENIED;
        if (!result.canAskAgain && !isUndetermined) return permissionsStatus.BLOCKED;

        return permissionsStatus.UNAVAILABLE;
    }

    /**
     * Requests the media library permission from the user.
     *
     * This method uses the `expo-image-picker` library to prompt the user for media library access permission.
     * It returns a promise that resolves with the permission status, which can be one of the following:
     * 'granted', 'denied', or 'undetermined'.
     *
     * @returns {Promise<PermissionStatus>} A promise that resolves with the current media library permission status.
     */
    public static async requestMediaLibraryPermission(): Promise<PermissionStatus> {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const isUndetermined = result.status === permissionsStatus.UNDETERMINED;

        if (result.granted) return permissionsStatus.GRANTED;
        if (isUndetermined) return permissionsStatus.UNDETERMINED;
        if (result.canAskAgain && !isUndetermined) return permissionsStatus.DENIED;
        if (!result.canAskAgain && !isUndetermined) return permissionsStatus.BLOCKED;

        return permissionsStatus.UNAVAILABLE;
    }
}