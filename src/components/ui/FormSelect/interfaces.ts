import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/* Hooks */
import { ItemOption } from '../../../interfaces/ui';

/* Defining the props that the component will receive. */
export interface FormSelectProps {
    controlStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    inputTextStyle?: StyleProp<TextStyle>;
    items: ItemOption[];
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    name: string;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    title: string;
}