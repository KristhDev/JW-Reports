import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type HeaderProps = {
    backButtonColor?: string;
    onBackButtonPress?: () => void;
    showTitle?: boolean;
    title?: string;
    showBackButton?: boolean;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
} | {
    backButtonColor?: string;
    onBackButtonPress?: () => void;
    showBackButton?: boolean;
    showTitle: true;
    style?: StyleProp<ViewStyle>;
    title: string;
    titleStyle?: StyleProp<TextStyle>;
}