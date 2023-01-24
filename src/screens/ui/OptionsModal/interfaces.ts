import { ItemOption } from '../../../interfaces/ui';

export interface OptionsModalProps {
    isOpen: boolean;
    items: ItemOption[];
    onCancel: () => void;
    onChangeValue: (value: string) => void;
    title: string;
    value: string;
}