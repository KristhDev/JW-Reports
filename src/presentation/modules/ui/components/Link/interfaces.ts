import { StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';

export interface LinkProps extends TouchableOpacityProps {
    textStyle?: StyleProp<TextStyle>;
}