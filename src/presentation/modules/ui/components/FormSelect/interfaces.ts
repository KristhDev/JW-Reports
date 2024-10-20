import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/* Hooks */
import { ItemOption } from '../../interfaces';

/* Defining the props that the component will receive. */
export interface FormSelectProps {
    controlStyle?: StyleProp<ViewStyle>;
    icon?: ReactNode;
    inputContainerStyle?: StyleProp<ViewStyle>;
    inputTextStyle?: StyleProp<TextStyle>;
    items: ItemOption[];
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    name: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    title: string;
}