import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/* Defining the props that the component will accept. */
export interface FormTimeProps {
    editable?: boolean;
    icon?: ReactNode;
    inputDateFormat: string;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    name: string;
    style?: StyleProp<ViewStyle>;
}