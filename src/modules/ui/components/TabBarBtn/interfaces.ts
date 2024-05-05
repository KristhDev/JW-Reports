/* Defining the props that the component will take. */
export interface TabBarBtnProps {
    active: boolean;
    color?: string;
    iconName?: string;
    onPress: () => void;
    title: string;
    totalTabs: number;
}