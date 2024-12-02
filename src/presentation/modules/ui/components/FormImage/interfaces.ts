import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

/* Models */
import { ImageModel } from '@domain/models';

export interface FormImageProps {
    cameraButtonText?: string;
    defaultImage?: any;
    disabled?: boolean;
    galleryButtonText?: string;
    imageStyle?: StyleProp<ImageStyle>;
    imageUrl?: string;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    onSelectImage: (image: ImageModel | null) => void;
    showCameraButton?: boolean;
    showGalleryButton?: boolean;
    style?: StyleProp<ViewStyle>;
}

export interface FormImageRef {
    clearImage: () => void;
}
