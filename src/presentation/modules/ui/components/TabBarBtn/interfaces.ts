/* Defining the props that the component will take. */
export interface TabBarBtnProps {
    active: boolean;
    color?: string;
    iconName?: string;
    onLongPress: () => void;
    onPress: () => void;
    title: string;
    totalTabs: number;
}