import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/* Defining the interface for the Fab component. */
export interface FabProps {
    color: string;
    icon: ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    touchColor: string;
}