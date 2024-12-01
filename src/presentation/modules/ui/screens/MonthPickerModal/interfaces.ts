import { ModalProps } from '../../interfaces';

export interface MonthPickerModalProps extends ModalProps {
    monthDate: string;
    onConfirm: (value: string) => void;
}