import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';

/* Defining the props that the component will accept. */
export interface DatetimeFieldProps extends Omit<TextInputProps, 'style'> {
    controlStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    icon?: ReactNode;
    inputDateFormat: string;
    inputStyle?: StyleProp<TextStyle>;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    mode?: 'date' | 'time' | 'datetime';
    onChangeDate: (date: string) => void;
    style?: StyleProp<ViewStyle>;
    value: string;
}