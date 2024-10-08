import { ComponentProps } from 'react';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';

export interface LinkProps extends ComponentProps<typeof TouchableOpacity> {
    textStyle?: StyleProp<TextStyle>;
}