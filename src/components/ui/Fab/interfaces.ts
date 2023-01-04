import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface FabProps {
    color: string;
    icon: ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    touchColor: string;
}