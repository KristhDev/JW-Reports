/* Defining the props that the component will take. */
export type SectionBtnProps = {
    disabled?: false;
    onPress: () => void;
    subText: string;
    text: string;
} | {
    disabled: true;
    onPress?: () => void;
    subText: string;
    text: string;
}