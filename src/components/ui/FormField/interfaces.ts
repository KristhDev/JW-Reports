
import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';

export interface FormFieldProps extends TextInputProps {
    name: string;
    label: string;
    icon?: ReactNode;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    controlStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
}