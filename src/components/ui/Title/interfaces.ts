import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/* Defining the interface for the props that will be passed to the component. */
export interface TitleProps {
    containerStyle?: StyleProp<ViewStyle>;
    text: string;
    textStyle?: StyleProp<TextStyle>;
}