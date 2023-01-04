import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface FabProps {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    icon: ReactNode;
    color: string;
    touchColor: string;
}