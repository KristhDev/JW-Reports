import { useState } from 'react';
import { openPicker, openCamera, Image } from 'react-native-image-crop-picker';

import usePermissions from './usePermissions';
import useStatus from './useStatus';
import useTheme from './useTheme';

const useImagePicker = () => {
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

    return {
        image,
        setImage,
        takeImageToGallery,
        takePhoto
    }
}

export default useImagePicker;