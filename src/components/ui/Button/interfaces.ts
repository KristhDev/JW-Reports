import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface Props {
    onPress: () => void;
    text: string;
    icon?: ReactNode;
    disabled?: boolean;
    touchableStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}