import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/* Defining the props that the component will accept. */
export interface InfoTextProps {
    containerStyle?: StyleProp<ViewStyle>;
    text: string;
    textStyle?: StyleProp<TextStyle>;
}