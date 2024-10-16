import { useState } from 'react';
import { PermissionStatus } from 'react-native-permissions';
import { useStyles } from 'react-native-unistyles';
import { clean, openPicker, openCamera, Image } from 'react-native-image-crop-picker';

/* Env */
import { SUPABASE_BUCKET, SUPABASE_REVISITS_FOLDER } from '@env';

/* Errors */
import { ImageError } from '@domain/errors';

/* Adapters */
import { DeviceInfo } from '@infrasturcture/adapters';

/* Services */
import { ImageService } from '../services';

/* Hooks */
import { usePermissions, useStatus } from './';

/* Utils */
import { permissionsMessages, permissionsStatus } from '../utils';

/**
 * This hook allows to group the functions and states in relation to the images.
 */
const useImage = () => {
    const { state: { permissions }, askPermission } = usePermissions();
    const { setStatus } = useStatus();
    const { theme: { colors } } = useStyles();

    const [ image, setImage ] = useState<Image | null>(null);

    const androidVersion = DeviceInfo.getSystemVersion();

    const isCameraBlocked = permissions.camera === permissionsStatus.BLOCKED;
    const isCameraDenied = permissions.camera === permissionsStatus.DENIED;
    const isCameraGranted = permissions.camera === permissionsStatus.GRANTED;
    const isCameraUnavailable = permissions.camera === permissionsStatus.UNAVAILABLE;

    const isReadExternalStorageBlocked = (permissions.readExternalStorage === 'blocked' && androidVersion < '13');
    const isReadExternalStorageDenied = (permissions.readExternalStorage === 'denied' && androidVersion < '13');
    const isReadExternalStorageGranted = (permissions.readExternalStorage === 'granted' && androidVersion < '13');
    const isReadExternalStorageUnavailable = (permissions.readExternalStorage === 'unavailable' && androidVersion < '13');

    const isReadMediaImagesBlocked = (permissions.readMediaImages === 'blocked' && androidVersion >= '13');
    const isReadMediaImagesDenied = (permissions.readMediaImages === 'denied' && androidVersion >= '13');
    const isReadMediaImagesGranted = (permissions.readMediaImages === 'granted' && androidVersion >= '13');
    const isReadMediaImagesUnavailable = (permissions.readMediaImages === 'unavailable' && androidVersion >= '13');

    /**
     * Clear the current image and delete it from the device
     *
     * @return {Promise<void>} This function does not return anything.
     */
    const clearImage = async (): Promise<void> => {
        setImage(null);
        await clean();
    }

    /**
     * It takes a URI, splits it into an array, and then removes the last item in the array
     * @param {string} uri - The uri of the image you want to delete.
     * @return {Promise<void>} This function return object.
     */
    const deleteImage = async (uri: string): Promise<void> => {
        await ImageService.deleteImage({ bucket: SUPABASE_BUCKET, folder: SUPABASE_REVISITS_FOLDER, uri });
    }

    /**
     * It opens the image picker, and if the user selects an image, it sets the image state.
     *
     * @return {Promise<void>} This function does not return anything.
     */
    const takeImageToGallery = async (): Promise<void> => {
        let permissionStatus: PermissionStatus = permissionsStatus.DENIED;

        /* This is a message that is shown to the user when the readExternalStorage or readMediaImages permission is unavailable. */
        if (isReadExternalStorageUnavailable || isReadMediaImagesUnavailable) {
            setStatus({ msg: permissionsMessages.UNSUPPORTED, code: 418 });
            return;
        }

        /* This is a message that is shown to the user when the readExternalStorage or readMediaImages permission is blocked. */
        if (isReadExternalStorageBlocked || isReadMediaImagesBlocked) {
            setStatus({ msg: permissionsMessages.REQUEST, code: 401 });
            return;
        }

        /* Asking for the readExternalStorage or readMediaImages permission. */
        if (isReadExternalStorageDenied) permissionStatus = await askPermission('readExternalStorage');
        if (isReadMediaImagesDenied) permissionStatus = await askPermission('readMediaImages');

        /* This is the code that is executed when the readExternalStorage or readMediaImages permission is granted. */
        if (isReadExternalStorageGranted || isReadMediaImagesGranted || permissionStatus === permissionsStatus.GRANTED) {
            try {
                const result = await openPicker({
                    cropperActiveWidgetColor: colors.button,
                    cropperStatusBarColor: '#000000',
                    cropperToolbarColor: '#000000',
                    cropperToolbarTitle: 'Editar Imagen',
                    cropperToolbarWidgetColor: '#FFFFFF',
                    cropping: true,
                    freeStyleCropEnabled: true,
                    includeBase64: true,
                    mediaType: 'photo',
                    multiple: false,
                });

                setImage(result);
            }
            catch (error) {
                const imageError = new ImageError((error as any).message);
                console.log(imageError);
                throw imageError;
            }
        }
    }

    /**
     * If the camera permission is unavailable, ask for it. If the camera permission is denied, show a
     * message. If the camera permission is granted, open the camera.
     *
     * @return {Promise<void>} This function does not return anything.
     */
    const takePhoto = async (): Promise<void> => {
        let permissionStatus: PermissionStatus = permissionsStatus.DENIED;

        /* This is a message that is shown to the user when the camera permission is unavailable. */
        if (isCameraUnavailable) {
            setStatus({ msg: permissionsMessages.UNSUPPORTED, code: 418 });
            return;
        }

        /* This is a message that is shown to the user when the camera permission is blocked. */
        if (isCameraBlocked) {
            setStatus({ msg: permissionsMessages.REQUEST, code: 401 });
            return;
        }

        /* This is the code that is executed when the camera permission is denied. */
        if (isCameraDenied || permissionStatus === permissionsStatus.DENIED) permissionStatus = await askPermission('camera');

        /* This is the code that is executed when the camera permission is granted. */
        if (isCameraGranted || permissionStatus === permissionsStatus.GRANTED || permissionStatus === permissionsStatus.UNAVAILABLE) {
            try {
                const result = await openCamera({
                    cropperActiveWidgetColor: colors.button,
                    cropperStatusBarColor: '#000000',
                    cropperToolbarColor: '#000000',
                    cropperToolbarTitle: 'Editar Foto',
                    cropperToolbarWidgetColor: '#FFFFFF',
                    cropping: true,
                    freeStyleCropEnabled: true,
                    includeBase64: true,
                    mediaType: 'photo',
                });

                setImage(result);
            }
            catch (error) {
                const imageError = new ImageError((error as any).message);
                console.log(imageError);
                throw imageError;
            }
        }
    }

    /**
     * It takes a photo, uploads it to Supabase, and returns the public URL of the photo
     * @param {Image} photo - This is the image that is being uploaded
     * @return {Promise<string | ImageError>} This function return object
     */
    const uploadImage = async (photo: Image, folder: string): Promise<string> => {
        const result = await ImageService.uploadImage({ bucket: SUPABASE_BUCKET, folder, image: photo });
        return result;
    }

    return {
        /* State */
        image,
        setImage,

        /* Functions */
        clearImage,
        deleteImage,
        takeImageToGallery,
        takePhoto,
        uploadImage,
    }
}

export default useImage;