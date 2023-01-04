
import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';

export interface DatetimeFieldProps extends TextInputProps {
    controlStyle?: StyleProp<ViewStyle>;
    icon?: ReactNode;
    inputDateFormat?: string;
    inputStyle?: StyleProp<TextStyle>;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    modalTitle: string;
    mode?: 'date' | 'time' | 'datetime';
    name: string;
    style?: StyleProp<ViewStyle>;
}