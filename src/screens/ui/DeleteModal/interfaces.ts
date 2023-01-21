import { ModalProps } from '../../../interfaces/ui';

export interface DeleteModalProps extends ModalProps {
    isLoading: boolean;
    onConfirm: () => void;
    text: string;
}