import { useState } from 'react';

/* Config */
import { env } from '@config/env';
import { cloudService, deviceImageService, messagesService } from '@config/di';

/* Constants */
import { permissionsStatus } from '@application/constants/utils';

/* Features */
import { PermissionStatus } from '@application/features/permissions';

/* Models */
import { ImageModel } from '@domain/models';

/* Hooks */
import { usePermissions, useStatus } from './';

/**
 * This hook allows to group the functions and states in relation to the images.
 */
const useImage = () => {
    const permissionsMessages = messagesService.permissionsMessages;

    const {
        askPermission,

        isCameraBlocked,
        isCameraDenied,
        isCameraGranted,
        isCameraUnavailable,
        isCameraUndetermined,

        isMediaLibraryBlocked,
        isMediaLibraryDenied,
        isMediaLibraryGranted,
        isMediaLibraryUnavailable,
        isMediaLibraryUndetermined,
    } = usePermissions();

    const { setStatus } = useStatus();
    const [ image, setImage ] = useState<ImageModel | null>(null);

    /**
     * Clear the current image and delete it from the device
     *
     * @return {void} This function does not return anything.
     */
    const clearImage = (): void => {
        setImage(null);
    }

    /**
     * It takes a URI, splits it into an array, and then removes the last item in the array
     * @param {string} uri - The uri of the image you want to delete.
     * @return {Promise<void>} This function return object.
     */
    const deleteImage = async (uri: string, folder: string): Promise<void> => {
        await cloudService.deleteImage({ bucket: env.SUPABASE_BUCKET!, folder, uri });
    }

    /**
     * It opens the image picker, and if the user selects an image, it sets the image state.
     *
     * @return {Promise<void>} This function does not return anything.
     */
    const takeImageToGallery = async (): Promise<void> => {
        let permissionStatus: PermissionStatus = permissionsStatus.DENIED;

        /* This is a message that is shown to the user when the media library permission is undetermined. */
        if (isMediaLibraryUnavailable) {
            setStatus({ msg: permissionsMessages.UNSUPPORTED, code: 418 });
            return;
        }

        /* Asking for the media library permission. */
        if (isMediaLibraryBlocked) {
            setStatus({ msg: permissionsMessages.REQUEST, code: 401 });
            return;
        }

        /* Asking for the media library permission. */
        if (isMediaLibraryDenied || isMediaLibraryUndetermined) permissionStatus = await askPermission('mediaLibrary');

        /* This is the code that is executed when the media library permission is granted. */
        if (isMediaLibraryGranted || permissionStatus === permissionsStatus.GRANTED) {
            try {
                const image = await deviceImageService.openPicker({ cropping: true });

                if (!image) return;
                setImage(image);
            }
            catch (error) {
                throw error;
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
        if (isCameraDenied || isCameraUndetermined) permissionStatus = await askPermission('camera');

        /* This is the code that is executed when the camera permission is granted. */
        if (isCameraGranted || permissionStatus === permissionsStatus.GRANTED) {
            try {
                const image = await deviceImageService.openCamera({
                    cameraType: deviceImageService.cameras.BACK,
                    cropping: true
                });

                if (!image) return;
                setImage(image);
            }
            catch (error) {
                throw error;
            }
        }
    }

    /**
     * It takes a photo, uploads it to Supabase, and returns the public URL of the photo
     * @param {ImageModel} photo - This is the image that is being uploaded
     * @return {Promise<string | ImageError>} This function return object
     */
    const uploadImage = async (photo: ImageModel, folder: string): Promise<string> => {
        const result = await cloudService.uploadImage({ bucket: env.SUPABASE_BUCKET!, folder, image: photo });
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