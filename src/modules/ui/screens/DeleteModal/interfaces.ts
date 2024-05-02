import { ModalProps } from '../../interfaces';

/* Creating a new interface called DeleteModalProps that extends the ModalProps interface. */
export interface DeleteModalProps extends ModalProps {
    isLoading: boolean;
    onConfirm: () => void;
    text: string;
}