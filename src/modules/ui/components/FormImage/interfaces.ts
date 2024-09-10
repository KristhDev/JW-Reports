import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Image } from 'react-native-image-crop-picker';

export interface FormImageProps {
    cameraButtonText?: string;
    defaultImage?: any;
    disabled?: boolean;
    galleryButtonText?: string;
    imageStyle?: StyleProp<ImageStyle>;
    imageUrl?: string;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    onSelectImage: (image: Image | null) => void;
    showCameraButton?: boolean;
    showGalleryButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
