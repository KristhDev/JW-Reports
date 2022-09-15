import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface Props {
    containerStyle?: StyleProp<ViewStyle>;
    text: string;
    textStyle?: StyleProp<TextStyle>;
}