
import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';

export interface FormFieldProps extends TextInputProps {
    controlStyle?: StyleProp<ViewStyle>;
    icon?: ReactNode;
    inputStyle?: StyleProp<TextStyle>;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    name: string;
    style?: StyleProp<ViewStyle>;
}