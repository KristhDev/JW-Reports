import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface InfoTextProps {
    containerStyle?: StyleProp<ViewStyle>;
    text: string;
    textStyle?: StyleProp<TextStyle>;
}