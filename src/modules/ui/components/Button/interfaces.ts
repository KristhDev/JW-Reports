import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/* Defining the interface for the props that the Button component will accept. */
export interface ButtonProps {
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    icon?: ReactNode;
    onPress: () => void;
    text: string;
    textStyle?: StyleProp<TextStyle>;
    pressableStyle?: StyleProp<ViewStyle>;
    underlayColor?: string;
}