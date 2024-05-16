import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';

/* Defining the props that the component will accept. */
export interface DatetimeFieldProps extends TextInputProps {
    controlStyle?: StyleProp<ViewStyle>;
    icon?: ReactNode;
    inputDateFormat: string;
    inputStyle?: StyleProp<TextStyle>;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    modalTitle: string;
    mode?: 'date' | 'time' | 'datetime';
    name: string;
    style?: StyleProp<ViewStyle>;
}