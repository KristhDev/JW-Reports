export interface PassToCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ModalActionProps {
    onClose: () => void;
    onConfirm: () => void;
}