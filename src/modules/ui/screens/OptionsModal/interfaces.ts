import { ItemOption } from '../../interfaces';

/* Defining the props that the component will receive. */
export interface OptionsModalProps {
    isOpen: boolean;
    items: ItemOption[];
    onCancel: () => void;
    onChangeValue: (value: string) => void;
    title: string;
    value: string;
}