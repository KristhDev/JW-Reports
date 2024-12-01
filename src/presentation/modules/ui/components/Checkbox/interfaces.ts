import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface CheckboxProps {
    label: string;
    onPress: () => void;
    status: 'checked' | 'unchecked' | 'indeterminate';
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}