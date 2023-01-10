export interface RevisitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ModalActionProps {
    onClose: () => void;
    onConfirm: () => void;
    revisitPerson: boolean;
}