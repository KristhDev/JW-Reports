import { StyleProp, ViewStyle } from 'react-native';

/* Defining the props that the component will receive. */
export interface RadioBtnProps {
    isSelected: boolean;
    style?: StyleProp<ViewStyle>,
    label: string;
    onPress: () => void;
}