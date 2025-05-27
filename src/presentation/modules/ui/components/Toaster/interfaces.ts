import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ToasterProps {
    message: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}