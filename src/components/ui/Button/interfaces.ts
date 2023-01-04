import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps {
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    icon?: ReactNode;
    onPress: () => void;
    text: string;
    textStyle?: StyleProp<TextStyle>;
    touchableStyle?: StyleProp<ViewStyle>;
    underlayColor?: string;
}