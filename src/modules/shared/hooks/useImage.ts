import { useState } from 'react';
import { useStyles } from 'react-native-unistyles';
import { openPicker, openCamera, Image } from 'react-native-image-crop-picker';
import { decode } from 'base64-arraybuffer';

/* Env */
import { SUPABASE_BUCKET, SUPABASE_REVISITS_FOLDER } from '@env';

/* Supaḃase */
import { supabase } from '@config';

/* Hooks */
import { usePermissions, useStatus } from './';

/* Interfaces */
import { StorageError } from '@ui';

/* Utils */
import { deviceInfo } from '@utils';

/**
 * This hook allows to group the functions and states in relation to the images.
 */
const useImage = () => {
    const { state: { permissions }, askPermission } = usePermissions();
    const { setStatus } = useStatus();
    const { theme: { colors } } = useStyles();

    const [ image, setImage ] = useState<Image | null>(null);

    const androidVersion = deviceInfo.getSystemVersion();

    /**
     * It takes a URI, splits it into an array, and then removes the last item in the array
     * @param {string} uri - The uri of the image you want to delete.
     * @return {Promise<{ data: any[] | null, error: StorageError | null }>} This function return object.
     */
    const deleteImage = async (uri: string): Promise<{ data: any[] | null, error: StorageError | null }> => {
        const imageId = uri.split('/')[uri.split('/').length - 1];

        const result = await supabase.storage
            .from('jw-reports')
            .remove([ `${ SUPABASE_REVISITS_FOLDER }/${ imageId }` ]);

        return result;
    }

    /**
     * It opens the image picker, and if the user selects an image, it sets the image state.
     *
     * @return {Promise<void>} This function does not return anything.
     */
    const takeImageToGallery = async (): Promise<void> => {
        /* Asking for the readExternalStorage or readMediaImages permission. */
        if (permissions.readExternalStorage === 'unavailable' && androidVersion < '13') await askPermission('readExternalStorage');
        if (permissions.readExternalStorage === 'unavailable' && androidVersion >= '13') await askPermission('readMediaImages');

        /* This is a message that is shown to the user when the readExternalStorage or readMediaImages permission is denied. */
        if ((permissions.readExternalStorage === 'denied' && androidVersion < '13') || (permissions.readMediaImages === 'denied' && androidVersion >= '13')) {
            setStatus({
                msg: 'Para realizar está acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación',
                code: 400
            });
        }

        /* This is the code that is executed when the readExternalStorage or readMediaImages permission is granted. */
        if ((permissions.readExternalStorage === 'granted' && androidVersion < '13') || (permissions.readMediaImages === 'granted' && androidVersion >= '13')) {
            try {
                const result = await openPicker({
                    cropperActiveWidgetColor: colors.button,
                    cropperStatusBarColor: '#000000',
                    cropperToolbarColor: '#000000',
                    cropperToolbarTitle: 'Editar Foto',
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
                console.log(error);
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
        /* Asking for the camera permission. */
        if (permissions.camera === 'unavailable') await askPermission('camera');

        /* This is a message that is shown to the user when the camera permission is denied. */
        if (permissions.camera === 'denied') {
            setStatus({
                msg: 'Para realizar está acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación',
                code: 400
            });
        }

        /* This is the code that is executed when the camera permission is granted. */
        if (permissions.camera === 'granted') {
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
                console.log(error);
            }
        }
    }

    /**
     * It takes a photo, uploads it to Supabase, and returns the public URL of the photo
     * @param {Image} photo - This is the image that is being uploaded
     * @return {Promise<{ data: { publicUrl: string } | null, error: StorageError | null }>} This function return object
     */
    const uploadImage = async (photo: Image): Promise<{ data: { publicUrl: string } | null, error: StorageError | null }> => {
        const file = photo.path.split('/')[photo.path.split('/').length - 1];
        const [ fileName, fileExt ] = file.split('.');
        const id = Math.floor(Math.random()).toString(16);

        const result = await supabase.storage
            .from(SUPABASE_BUCKET)
            .upload(`${ SUPABASE_REVISITS_FOLDER }/${ id }-${ fileName }.${ fileExt }`, decode(photo.data!), {
                contentType: photo.mime
            });

        if (result.error) return result;

        const { data } = await supabase.storage
            .from(SUPABASE_BUCKET)
            .getPublicUrl(result.data.path);

        return {
            data,
            error: null
        }
    }

    return {
        /* State */
        image,
        setImage,

        /* Functions */
        deleteImage,
        takeImageToGallery,
        takePhoto,
        uploadImage,
    }
}

export default useImage;