import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Image } from 'react-native-image-crop-picker';

export interface FormImageProps {
    defaultImage?: any;
    disabled?: boolean;
    imageStyle?: StyleProp<ImageStyle>;
    imageUrl?: string;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    onSelectImage: (image: Image | null) => void;
    style?: StyleProp<ViewStyle>;
}
