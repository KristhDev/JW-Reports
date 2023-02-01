import { useState } from 'react';
import { openPicker, openCamera, Image } from 'react-native-image-crop-picker';
import { decode } from 'base64-arraybuffer';

import { SUPABASE_BUCKET, SUPABASE_REVISITS_FOLDER } from '@env';
import { supabase } from '../supabase/config';

import { usePermissions, useStatus, useTheme } from './';

const useImage = () => {
    const { state: { permissions }, askPermission } = usePermissions();
    const { setStatus } = useStatus();
    const { state: { colors } } = useTheme();

    const [ image, setImage ] = useState<Image>({} as Image);

    const takeImageToGallery = async () => {
        if (permissions.mediaLibrary === 'unavailable') await askPermission('mediaLibrary');

        if (permissions.mediaLibrary === 'denied') {
            setStatus({
                msg: 'Para realizar está acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación',
                code: 400
            });
        }

        if (permissions.mediaLibrary === 'granted') {
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

    const takePhoto = async () => {
        if (permissions.camera === 'unavailable') await askPermission('camera');

        if (permissions.camera === 'denied') {
            setStatus({
                msg: 'Para realizar está acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación',
                code: 400
            });
        }

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

    const uploadImage = async (photo: Image) => {
        const file = photo.path.split('/')[photo.path.split('/').length - 1];
        const [ fileName, fileExt ] = file.split('.');

        const result = await supabase.storage
            .from(SUPABASE_BUCKET)
            .upload(`${ SUPABASE_REVISITS_FOLDER }/${ fileName }.${ fileExt }`, decode(photo.data!), {
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

    const deleteImage = async (uri: string) => {
        const imageId = uri.split('/')[uri.split('/').length - 1];

        const result = await supabase.storage
            .from('jw-reports')
            .remove([ `${ SUPABASE_REVISITS_FOLDER }/${ imageId }` ]);

        return result;
    }

    return {
        image,
        setImage,
        takeImageToGallery,
        takePhoto,
        uploadImage,
        deleteImage
    }
}

export default useImage;