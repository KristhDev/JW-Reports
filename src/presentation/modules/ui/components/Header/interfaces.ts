import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type HeaderProps = {
    backButtonColor?: string;
    onBackButtonPress?: () => void;
    showTitle?: boolean;
    title?: string;
    subtitle?: string;
    showBackButton?: boolean;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
} | {
    backButtonColor?: string;
    onBackButtonPress?: () => void;
    showBackButton?: boolean;
    showTitle: true;
    style?: StyleProp<ViewStyle>;
    title: string;
    subtitle?: string;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
}