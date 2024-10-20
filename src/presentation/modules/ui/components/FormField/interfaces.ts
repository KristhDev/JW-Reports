import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';

/* Defining the interface for the FormField component. */
export interface FormFieldProps extends TextInputProps {
    controlStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    leftIcon?: ReactNode;
    name: string;
    rightIcon?: ReactNode;
    style?: StyleProp<ViewStyle>;
}