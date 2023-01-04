import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface TitleProps {
    containerStyle?: StyleProp<ViewStyle>;
    text: string;
    textStyle?: StyleProp<TextStyle>;
}