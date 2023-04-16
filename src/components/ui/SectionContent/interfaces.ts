import { StyleProp, ViewStyle } from 'react-native';

/* Defining the interface for the props that will be passed to the component. */
export interface SectionContentProps {
    containerStyle?: StyleProp<ViewStyle>;
    title: string;
}