import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface CheckboxProps {
    onPress: () => void;
    status: 'checked' | 'unchecked' | 'indeterminate';
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}