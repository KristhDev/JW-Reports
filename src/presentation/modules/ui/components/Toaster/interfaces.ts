import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { ToastAction } from '@application/context';

export interface ToasterProps {
    cancelAction?: ToastAction;
    confirmAction?: ToastAction;
    message: string;
    onClose: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}