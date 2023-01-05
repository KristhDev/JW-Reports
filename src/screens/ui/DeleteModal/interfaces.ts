export interface DeleteModalProps {
    isLoading: boolean;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    text: string;
}