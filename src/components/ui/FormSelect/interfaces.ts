import { StyleProp, ViewStyle, TextStyle } from 'react-native';

import { ItemOption } from '../../../interfaces/ui';

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
}