/* Interfaces */
import { ItemOption } from '@infrasturcture/interfaces';

/* Defining the props that the component will receive. */
export interface OptionsModalProps {
    isOpen: boolean;
    items: ItemOption[];
    onCancel: () => void;
    onChangeValue: (value: any) => void;
    title: string;
    value: any;
}