import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ToastAction {
    label: string;
    onPress: () => void;
    textStyle?: StyleProp<TextStyle>;
    touchableStyle?: StyleProp<ViewStyle>;
}

export interface ToastOptions {
    autoClose?: boolean;
    cancelAction?: ToastAction;
    confirmAction?: ToastAction;
    duration?: number;
    toastStyle?: StyleProp<ViewStyle>;
    toastTextStyle?: StyleProp<TextStyle>;
}

export interface ToasterContextProps {
    hideToast: () => void;
    showToast: (message: string, options?: ToastOptions) => void;
}

export interface ToasterProviderProps extends ToastOptions {}