import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ToastOptions {
    autoClose?: boolean;
    duration?: number;
    toastStyle?: StyleProp<ViewStyle>;
    toastTextStyle?: StyleProp<TextStyle>;
}

export interface ToasterContextProps {
    hideToast: () => void;
    showToast: (message: string, options?: ToastOptions) => void;
}

export interface ToasterProviderProps extends ToastOptions {}